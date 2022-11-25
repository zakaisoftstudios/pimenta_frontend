import React from 'react'
import { Formik } from 'formik'
import * as JobSearchAPI from '../../../services/api/jobSearch'
import * as JobSearchAPINonAuthenticated from '../../../services/api/jobSearchNonAuthenticated'
import * as LikesAPI from '../../../services/api/likes'
import JobSearchForm from '../../../atomic/organisms/JobSearchForm'
import Pagination from '../../../atomic/molecules/Pagination'
import JobSearchResults from '../../../atomic/organisms/JobSearchResults'
import JobSearchResultsNonAuthenticated from '../../../atomic/organisms/nonAuthenticated/JobSearchResults'
import JobDetails from '../../../atomic/organisms/JobDetails'
import {
  removeEmpty,
  extractValues,
  extractValue
} from '../../../services/util/search'
import * as Yup from 'yup'
import jobLikeStatuses from '../../../constants/jobLikeStatuses'
import { Redirect } from 'react-router-dom'
import MatchMessageModal, {
  matchMessageTo
} from '../../../atomic/molecules/MatchMessageModal'
import CompanyProfile from '../../../atomic/organisms/CompanyProfile'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { setLastFilter } from '../../../actions/filters'

const FIRST_PAGE = 1

class StudentJobSearchContainer extends React.Component {
  formRef = React.createRef()

  state = {
    apiError: '',
    results: [],
    loadingResults: true,
    jobOfferToShow: null,
    companyProfileToShow: null,
    searchValue: '',
    showForm: false,
    filterFired: false,
    totalItemsCount: 0,
    reopen: true,
    orderBy: 'match',
    goToChat: false,
    showMatchMessage: false
  }

  initialValues = () => ({
    text_search: '',
    wage_from: '',
    wage_to: '',
    minimum_degree: null,
    category: null,
    working_hours_per_week_from: null,
    working_hours_per_week_to: null,
    start: null,
    distance: null
  })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      working_hours_per_week_from: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`))
        .max(50, i18n._(t`Max 50`)),
      working_hours_per_week_to: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`))
        .max(50, i18n._(t`Max 50`)),
      wage_from: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`)),
      wage_to: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1`)),
      start: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
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
        var results;
        if (this.props.isNoAuthenticated) {
          results = await JobSearchAPINonAuthenticated.getAll(
            this.processFilters(filters),
            page
          )
        } else {
          results = await JobSearchAPI.getAll(
            this.processFilters(filters),
            page
          )
        }
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
    const { minimum_degree, category, distance, ...filtersRest } = filters
    const { orderBy } = this.state

    let parsedFilters = {
      'minimum_degree[]': extractValues(minimum_degree),
      'category[]': extractValues(category),
      distance: extractValue(distance),
      order_by: orderBy,
      ...filtersRest
    }

    removeEmpty(parsedFilters)
    return parsedFilters
  }

  handleShowJobOffer = jobOffer => () => {
    return this.setState({ jobOfferToShow: jobOffer })
  }

  handleShowCompanyProfile = () =>
    this.setState(prev => ({
      companyProfileToShow: prev.jobOfferToShow.company_profile
    }))

  handleLeaveCompanyProfile = () =>
    this.setState({
      companyProfileToShow: null
    })

  handleBackToSearch = () => this.setState({ jobOfferToShow: null })

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

  handleJobLikeAction = jobOfferId => async () => {
    const { results } = this.state
    const jobOffer = results.find(result => result.id === jobOfferId)

    switch (jobOffer.job_like_status) {
      case jobLikeStatuses.MATCHED:
        return this.goToChat()
      case jobLikeStatuses.MATCHED_FROM_HUNT:
        return this.goToChat()
      case jobLikeStatuses.STUDENT_LIKED:
        return this.destroyLike(jobOffer)
      case jobLikeStatuses.NONE:
        return this.createLike(jobOffer)
    }
  }

  goToChat = () => this.setState({ goToChat: true })

  destroyLike = async jobOffer => {
    const res = await LikesAPI.destroy(jobOffer.like.id)

    if (!res.error)
      this.updateJobLikeStatus(jobOffer.id, {
        job_like_status: jobLikeStatuses.NONE,
        like: null
      })
  }

  createLike = async jobOffer => {
    const like = await LikesAPI.post(jobOffer.id)
    if (!like.error) this.updateJobLikeStatus(jobOffer.id, like)
  }

  updateJobLikeStatus = (jobOfferId, like) => {
    const newResults = this.state.results.map(result =>
      result.id === jobOfferId
        ? { ...result, job_like_status: like.job_like_status, like }
        : result
    )

    const showMatchMessage =
      like.job_like_status === jobLikeStatuses.MATCHED ||
      like.job_like_status === jobLikeStatuses.MATCHED_FROM_HUNT

    this.setState({ results: newResults, showMatchMessage })
  }

  handleCloseMatchMessageModal = () =>
    this.setState({ showMatchMessage: false })

  render() {
    const {
      apiError,
      results,
      loadingResults,
      jobOfferToShow,
      companyProfileToShow,
      showForm,
      searchValue,
      filterFired,
      totalItemsCount,
      reopen,
      orderBy,
      goToChat,
      showMatchMessage
    } = this.state

    if (goToChat) return <Redirect to="/student/chat" />

    if (companyProfileToShow) {
      return (
        <CompanyProfile
          profile={companyProfileToShow}
          ready={true}
          canEdit={false}
          handleReturn={this.handleLeaveCompanyProfile}
          forMobile={true}
        />
      )
    }

    if (jobOfferToShow) {
      return (
        <StyledJobDetails
          jobOffer={jobOfferToShow}
          handleReturn={this.handleShowJobOffer(null)}
          canSeeApplicants={false}
          canEdit={false}
          handleShowCompanyProfile={this.handleShowCompanyProfile}
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
          <JobSearchForm
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
          {({ paginationComponent }) => (
            this.props.hasNoAuthentication ? 
            ( 
              <JobSearchResultsNonAuthenticated
                results={results}
                loadingResults={loadingResults}
                handleShowJobOffer={this.handleShowJobOffer}
                handleJobLikeAction={this.handleJobLikeAction}
                handleOrderChange={this.handleOrderChange}
                filterFired={filterFired}
                paginationComponent={paginationComponent}
                totalItemsCount={totalItemsCount}
                orderBy={'start_date'}
                handleShowCompanyProfile={this.handleShowCompanyProfile}
                />
            )
            :
            (
              <JobSearchResults
                results={results}
                loadingResults={loadingResults}
                handleShowJobOffer={this.handleShowJobOffer}
                handleJobLikeAction={this.handleJobLikeAction}
                handleOrderChange={this.handleOrderChange}
                filterFired={filterFired}
                paginationComponent={paginationComponent}
                totalItemsCount={totalItemsCount}
                orderBy={orderBy}
                handleShowCompanyProfile={this.handleShowCompanyProfile}
              />
            )
          )}
      </Pagination>
    )

    return (
      <React.Fragment>
        {reopen && filterFormComponent}
        {resultsComponent}

        {showMatchMessage && (
          <MatchMessageModal
            to={matchMessageTo.STUDENT}
            handleClose={this.handleCloseMatchMessageModal}
          />
        )}
      </React.Fragment>
    )
  }
}

const StyledJobDetails = styled(JobDetails)`
  padding: 0;
`

const mapStateToProps = ({ filters }) => {
  return { lastFilter: filters.lastFilter }
}

const mapDispatchToProps = dispatch => ({
  setLastFilter: payload => dispatch(setLastFilter(payload))
})

export default withI18n()(
  connect(mapStateToProps, mapDispatchToProps)(StudentJobSearchContainer)
)
