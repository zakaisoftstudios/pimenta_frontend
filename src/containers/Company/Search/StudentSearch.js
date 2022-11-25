import React from 'react'
import { Formik } from 'formik'
import * as SkillsAPI from '../../../services/api/skills'
import * as StrengthsAPI from '../../../services/api/strengths'
import * as InterestsAPI from '../../../services/api/interests'
import * as CompanyHuntingAPI from '../../../services/api/companyHunting'
import * as HuntsAPI from '../../../services/api/hunts'
import CompanyHuntResults from '../../../atomic/organisms/CompanyHuntResults'
import CompanyHuntForm from '../../../atomic/organisms/CompanyHuntForm'
import CompanyHunt from '../../../atomic/organisms/CompanyHunt'
import Pagination from '../../../atomic/molecules/Pagination'
import StudentPublicProfile from '../../../atomic/organisms/StudentPublicProfile'
import * as Yup from 'yup'
import huntAges from '../../../constants/huntAges'
import huntDistances from '../../../constants/huntDistances'
import {
  removeEmpty,
  extractValues,
  extractIds,
  extractValue
} from '../../../services/util/search'
import huntStatuses from '../../../constants/huntStatuses'
import { Redirect } from 'react-router-dom'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const FIRST_PAGE = 1

class CompanyStudentHuntingContainer extends React.Component {
  state = {
    apiError: '',
    results: [],
    loadingResults: true,
    showForm: false,
    filterFired: false,
    skills: [],
    strengths: [],
    interests: [],
    studentProfileToShow: null,
    reopen: true,
    totalItemsCount: 0,
    lastFilter: null,
    huntAges: null,
    huntDistances: null,
    goToChat: false,
    showMatchMessage: false
  }

  initialValues = () => ({
    text_search: '',
    age_from: null,
    age_to: null,
    grade_point_average: null,
    gender: '',
    mobility: '',
    distance: null,
    educational_level: '',
    skills: null,
    strengths: null,
    interests: null
  })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      grade_point_average: Yup.number().nullable()
        .max(100, i18n._(t`Max grade of 100`))
        .min(0, i18n._(t`Min grade of 1`))
    })
  }

  async componentDidMount() {
    const skills = await SkillsAPI.getAll()
    const strengths = await StrengthsAPI.getAll()
    const interests = await InterestsAPI.getAll()
    this.loadResults(this.initialValues())

    this.setState({
      skills,
      strengths,
      interests,
      huntAges: huntAges(),
      huntDistances: huntDistances(),
      lastFilter: this.initialValues()
    })
  }

  loadResults = async (filters, page = FIRST_PAGE) => {
    this.setState(
      () => ({ loadingResults: true, filterFired: true }),
      async () => {
        const results = await CompanyHuntingAPI.getAll(
          this.processFilters(filters),
          page
        )
        const totalItemsCount = this.getTotalItemsCount(results)
        this.setState({ results, totalItemsCount, loadingResults: false })
      }
    )
  }

  isAdvancedFiltersFired = currentFilters => {
    const { text_search, ...currentAdvancedFilters } = currentFilters

    const allAdvancedFiltersKeys = [
      'age_to',
      'age_from',
      'gender[]',
      'mobility[]',
      'distance',
      'educational_level[]',
      'skill_ids[]',
      'interest_ids[]',
      'strength_ids[]',
      'grade_point_average'
    ]

    return Object.keys(currentAdvancedFilters || []).some(key =>
      allAdvancedFiltersKeys.includes(key)
    )
  }

  getTotalItemsCount = results =>
    results.length > 0 ? results[0].total_items_count : 0

  processFilters = filters => {
    const {
      skills,
      interests,
      strengths,
      mobility,
      distance,
      educational_level,
      age_from,
      age_to,
      gender,
      ...filtersRest
    } = filters

    let parsedFilters = {
      age_from: extractValue(age_from),
      age_to: extractValue(age_to),
      'gender[]': extractValues(gender),
      'mobility[]': extractValues(mobility),
      distance: extractValue(distance),
      'educational_level[]': extractValues(educational_level),
      'skill_ids[]': extractIds(skills),
      'interest_ids[]': extractIds(interests),
      'strength_ids[]': extractIds(strengths),
      ...filtersRest
    }

    removeEmpty(parsedFilters)
    return parsedFilters
  }

  handleFilter = async (values, { setSubmitting }) => {
    this.setState({ showForm: false, lastFilter: values })
    await this.loadResults(values)

    setSubmitting(false)
  }

  handlePageChangeCallback = async pageNumber => {
    await this.loadResults(this.state.lastFilter, pageNumber)
  }

  handleShowStudentProfile = index => () =>
    this.setState(prev => ({ studentProfileToShow: prev.results[index] }))

  handleBackToSearch = () => this.setState({ studentProfileToShow: null })

  handleCloseMatchMessageModal = () =>
    this.setState({ showMatchMessage: false })

  handleHuntAction = studentProfileId => async () => {
    const { results } = this.state
    const studentProfile = results.find(
      result => result.id === studentProfileId
    )

    switch (studentProfile.hunt_status) {
      case huntStatuses.MATCHED:
        return this.goToChat()
      case huntStatuses.HUNTED:
        return this.destroyHunt(studentProfile)
      case huntStatuses.NONE:
        return this.createHunt(studentProfile)
    }
  }

  destroyHunt = async studentProfile => {
    const res = await HuntsAPI.destroy(studentProfile.hunt.id)

    if (!res.error)
      this.updateHuntStatus(studentProfile.id, {
        hunt_status: huntStatuses.NONE,
        hunt: null
      })
  }

  createHunt = async studentProfile => {
    const hunt = await HuntsAPI.post(studentProfile.id)

    if (!hunt.error) this.updateHuntStatus(studentProfile.id, hunt)
  }

  goToChat = () => this.setState({ goToChat: true })

  updateHuntStatus = (studentId, hunt) => {
    const newResults = this.state.results.map(result =>
      result.id === studentId
        ? { ...result, hunt_status: hunt.hunt_status, hunt }
        : result
    )

    const showMatchMessage = hunt.hunt_status === huntStatuses.MATCHED

    this.setState({ results: newResults, showMatchMessage })
  }

  handleShowForm = (showForm, currentFilters) => () => {
    if (!showForm) this.setState({ lastFilter: currentFilters })
    this.setState({ showForm })
  }

  handleClearFilters = () => {
    this.setState({ lastFilter: this.initialValues() })
    this.setState(
      () => ({ reopen: false }),
      () => this.setState({ reopen: true })
    )
  }

  render() {
    const {
      apiError,
      results,
      loadingResults,
      skills,
      strengths,
      interests,
      studentProfileToShow,
      showForm,
      filterFired,
      reopen,
      totalItemsCount,
      huntAges,
      huntDistances,
      lastFilter,
      goToChat,
      showMatchMessage
    } = this.state

    if (goToChat) return <Redirect to="/company/chat" />

    if (studentProfileToShow) {
      return (
        <StudentPublicProfile
          profile={studentProfileToShow}
          handleReturn={this.handleBackToSearch}
          publicProfile
        />
      )
    }

    const filterForm = (
      <Formik
        initialValues={lastFilter}
        validationSchema={this.validationSchema()}
        onSubmit={this.handleFilter}
        render={formikProps => (
          <CompanyHuntForm
            apiError={apiError}
            skills={skills}
            strengths={strengths}
            interests={interests}
            showForm={showForm}
            handleShowForm={this.handleShowForm}
            handleClearFilters={this.handleClearFilters}
            filterFired={filterFired}
            huntAges={huntAges}
            huntDistances={huntDistances}
            {...formikProps}
          />
        )}
      />
    )

    const resultsComponent = (
      <Pagination
        totalItemsCount={totalItemsCount}
        handlePageChangeCallback={this.handlePageChangeCallback}
      >
        {({ paginationComponent }) => (
          <CompanyHuntResults
            results={results}
            loadingResults={loadingResults}
            handleShowStudentProfile={this.handleShowStudentProfile}
            handleHuntAction={this.handleHuntAction}
            showForm={showForm}
            filterFired={filterFired}
            paginationComponent={paginationComponent}
            totalItemsCount={totalItemsCount}
          />
        )}
      </Pagination>
    )

    return (
      <CompanyHunt
        filterFormComponent={filterForm}
        resultsComponent={resultsComponent}
        reopen={reopen}
        showMatchMessage={showMatchMessage}
        handleCloseMatchMessageModal={this.handleCloseMatchMessageModal}
      />
    )
  }
}

export default withI18n()(CompanyStudentHuntingContainer)
