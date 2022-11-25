import React from 'react'
import { Formik } from 'formik'
import * as SubjectSearchAPI from '../../../services/api/companySubjectSearch'
import * as SubjectLikesAPI from '../../../services/api/subjectLikes'
import likeStates from '../../../constants/likeStates'
import SubjectSearchForm from '../../../atomic/organisms/SubjectSearchForm'
import Pagination from '../../../atomic/molecules/Pagination'
import SubjectSearchResults from '../../../atomic/organisms/SubjectSearchResults'
import SubjectDetails from '../../../atomic/organisms/SubjectDetails'
import {
  removeEmpty,
  extractValues,
  extractValue
} from '../../../services/util/search'
import * as Yup from 'yup'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import styled from 'styled-components'
import UniversityProfile from '../../../atomic/organisms/UniversityProfile'
import { connect } from 'react-redux'
import { setLastFilter } from '../../../actions/filters'

const FIRST_PAGE = 1

class CompanySubjectSearchContainer extends React.Component {
  formRef = React.createRef()

  state = {
    apiError: '',
    results: [],
    loadingResults: true,
    subjectOfferToShow: null,
    universityProfileToShow: null,
    searchValue: '',
    showForm: false,
    filterFired: false,
    totalItemsCount: 0,
    reopen: true,
    orderBy: 'match'
  }

  initialValues = () => ({
    text_search: '',
    cost_amount_from: null,
    cost_amount_to: null,
    nummerus_clausus: null,
    duration_in_hours_from: null,
    duration_in_hours_to: null,
    start_date: null,
    start_dates: [],
    type_of_degree: null,
    minimum_degree: null,
    distance: null
  })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      cost_amount_from: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`)),
      cost_amount_to: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`)),
      nummerus_clausus: Yup.number()
        .nullable()
        .max(15, i18n._(t`Max 15`))
    })
  }

  async componentDidMount() {
    this.loadResults(this.initialValues())
  }

  getTotalItemsCount = results =>
    results.length > 0 ? results[0].total_items_count : 0

  loadResults = async (filters, page = FIRST_PAGE) => {
    this.setState(
      () => ({ loadingResults: true, filterFired: true }),
      async () => {
        let results = await SubjectSearchAPI.getAll(
          this.processFilters(filters),
          page
        )
        const totalItemsCount = this.getTotalItemsCount(results)
        this.setState({ results, totalItemsCount, loadingResults: false })
      }
    )
  }

  handleFilter = async (values, { setSubmitting }) => {
    this.setState({ showForm: false })
    const { setLastFilter } = this.props
    setLastFilter(values)
    await this.loadResults(values)
    setSubmitting(false)
  }

  processFilters = filters => {
    const {
      minimum_degree,
      type_of_degree,
      category,
      distance,
      ...filtersRest
    } = filters
    const { orderBy } = this.state

    let parsedFilters = {
      'minimum_degree[]': extractValues(minimum_degree),
      'type_of_degree[]': extractValues(type_of_degree),
      distance: extractValue(distance),
      order_by: orderBy,
      ...filtersRest
    }

    removeEmpty(parsedFilters)
    return parsedFilters
  }

  handleShowSubjectOffer = subjectOffer => () => {
    return this.setState({ subjectOfferToShow: subjectOffer })
  }

  handleShowUniversityProfile = () =>
    this.setState(prev => ({
      universityProfileToShow: prev.subjectOfferToShow.university_profile
    }))

  handleLeaveUniversityProfile = () =>
    this.setState({
      universityProfileToShow: null
    })

  handleBackToSearch = () => this.setState({ subjectOfferToShow: null })

  handleOrderChange = option => {
    this.setState(
      () => ({ orderBy: option.value }),
      () => this.formRef.current.handleSubmit({ preventDefault: () => null })
    )
  }

  handlePageChangeCallback = async pageNumber => {
    const { lastFilter } = this.props
    if (lastFilter) {
      await this.loadResults(lastFilter, pageNumber)
    } else {
      await this.loadResults(this.initialValues, pageNumber)
    }
  }

  handleShowForm = showForm => () => this.setState({ showForm })

  handleReopen = () =>
    this.setState(
      () => ({ reopen: false }),
      () => this.setState({ reopen: true })
    )

  handleSubjectLikeAction = subjectOffer => async () => {
    let res

    if (subjectOffer.like) {
      res = await SubjectLikesAPI.destroy(subjectOffer.like.id)
      this.updateSubjectLike(subjectOffer, null)
    } else {
      res = await SubjectLikesAPI.post(subjectOffer.id)
      this.updateSubjectLike(subjectOffer, res)
    }
  }

  updateSubjectLike = (subjectOffer, like) => {
    const newResults = this.state.results.map(result =>
      result.id === subjectOffer.id ? { ...result, like } : result
    )

    this.setState({ results: newResults })
  }

  render() {
    const {
      apiError,
      results,
      loadingResults,
      subjectOfferToShow,
      universityProfileToShow,
      showForm,
      searchValue,
      filterFired,
      totalItemsCount,
      reopen,
      orderBy
    } = this.state

    if (universityProfileToShow) {
      return (
        <UniversityProfile
          profile={universityProfileToShow}
          ready={true}
          canEdit={false}
          handleReturn={this.handleLeaveUniversityProfile}
          forMobile={true}
        />
      )
    }

    if (subjectOfferToShow) {
      return (
        <StyledSubjectDetails
          subjectOffer={subjectOfferToShow}
          handleReturn={this.handleShowSubjectOffer(null)}
          handleShowUniversityProfile={this.handleShowUniversityProfile}
          canSeeApplicants={false}
          canEdit={false}
        />
      )
    }

    const filterFormComponent = (
      <Formik
        ref={this.formRef}
        initialValues={this.initialValues()}
        validationSchema={this.validationSchema()}
        onSubmit={this.handleFilter}
        render={formikProps => (
          <SubjectSearchForm
            apiError={apiError}
            showForm={showForm}
            handleShowForm={this.handleShowForm}
            handleReopen={this.handleReopen}
            searchValue={searchValue}
            filterFired={filterFired}
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
        {({ paginationComponent }) =>
          <SubjectSearchResults
            results={results}
            loadingResults={loadingResults}
            handleShowSubjectOffer={this.handleShowSubjectOffer}
            handleSubjectLikeAction={this.handleSubjectLikeAction}
            handleOrderChange={this.handleOrderChange}
            filterFired={filterFired}
            paginationComponent={paginationComponent}
            totalItemsCount={totalItemsCount}
            showOrderBy={false}
          />
        }
      </Pagination>
    )

    return (
      <React.Fragment>
        {reopen && filterFormComponent}
        {resultsComponent}
      </React.Fragment>
    )
  }
}

const StyledSubjectDetails = styled(SubjectDetails)`
  padding: 0;
`

const mapStateToProps = ({ filters }) => {
  return { lastFilter: filters.lastFilter }
}

const mapDispatchToProps = dispatch => ({
  setLastFilter: payload => dispatch(setLastFilter(payload))
})

export default withI18n()(connect(mapStateToProps, mapDispatchToProps)(CompanySubjectSearchContainer))
