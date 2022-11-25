import React from 'react'
import * as JobOffersAPI from '../../../services/api/jobOffers'
import JobListing from '../../../atomic/organisms/JobListing'
import JobDetails from '../../../atomic/organisms/JobDetails'
import { connect } from 'react-redux'
import { jobOfferStates } from '../../../constants/jobOfferStates'
import Pagination from '../../../atomic/molecules/Pagination'
import ActionModal from '../../../atomic/molecules/ActionModal'
import { Trans } from '@lingui/macro'

const FIRST_PAGE = 1

class CompanyJobsListContainer extends React.Component {
  state = {
    jobOffers: [],
    loadingJobOffers: true,
    stateFilter: jobOfferStates.PUBLISHED,
    jobToShow: null,
    activePage: 1,
    totalItemsCount: 0,
    removeJobOfferId: null
  }

  async componentDidMount() {
    const { stateFilter } = this.state
    await this.loadJobOffers(stateFilter, FIRST_PAGE)
  }

  loadJobOffers = async (stateFilter, pageNumber) => {
    this.setState({ loadingJobOffers: true })

    const jobOffers = await JobOffersAPI.getAll(stateFilter, pageNumber)

    this.setState({
      loadingJobOffers: false,
      jobOffers: jobOffers,
      totalItemsCount: this.gettotalItemsCount(jobOffers),
      stateFilter
    })
  }

  gettotalItemsCount = jobOffers =>
    jobOffers.length > 0 ? jobOffers[0].total_items_count : 0

  filteredJobOffers = () => {
    const { jobOffers, stateFilter } = this.state
    return jobOffers.filter(jobOffer => jobOffer.state === stateFilter)
  }

  changeFilter = stateFilter => async () =>
    await this.loadJobOffers(stateFilter, FIRST_PAGE)

  showJobDetails = jobToShow => () => this.setState({ jobToShow })

  handlePageChangeCallback = async pageNumber => {
    const { stateFilter } = this.state
    await this.loadJobOffers(stateFilter, pageNumber)
  }

  handleRemoveJobOffer = removeJobOfferId => () => {
    this.setState({ removeJobOfferId })
  }

  handleConfirmRemoveJobOffer = async () => {
    const { stateFilter, activePage, removeJobOfferId } = this.state

    this.setState({ removeJobOfferId: null, loadingJobOffers: true })
    await JobOffersAPI.destroy(removeJobOfferId)
    await this.loadJobOffers(stateFilter, activePage)
  }

  handleCancelRemoveJobOffer = () => this.setState({ removeJobOfferId: null })

  render() {
    const {
      jobOffers,
      loadingJobOffers,
      stateFilter,
      jobToShow,
      totalItemsCount,
      removeJobOfferId
    } = this.state

    const { profilePic, userName } = this.props

    if (jobToShow)
      return (
        <JobDetails
          jobOffer={jobToShow}
          handleReturn={this.showJobDetails(null)}
        />
      )

    return (
      jobOffers && (
        <React.Fragment>
          {removeJobOfferId && (
            <ActionModal
              content={
                <Trans>Are you sure you want to remove this Job Offer?</Trans>
              }
              actions={[
                {
                  name: <Trans>Yes</Trans>,
                  handler: this.handleConfirmRemoveJobOffer
                }
              ]}
              handleClose={this.handleCancelRemoveJobOffer}
            />
          )}

          <Pagination
            totalItemsCount={totalItemsCount}
            handlePageChangeCallback={this.handlePageChangeCallback}
          >
            {({ paginationComponent }) => (
              <JobListing
                loadingJobOffers={loadingJobOffers}
                jobOffers={this.filteredJobOffers()}
                profilePic={profilePic}
                userName={userName}
                stateFilter={stateFilter}
                changeFilter={this.changeFilter}
                showJobDetails={this.showJobDetails}
                paginationComponent={paginationComponent}
                totalItemsCount={totalItemsCount}
                handleRemoveJobOffer={this.handleRemoveJobOffer}
              />
            )}
          </Pagination>
        </React.Fragment>
      )
    )
  }
}

export default connect(
  ({ auth: { profilePic, userName } }) => ({ profilePic, userName }),
  null
)(CompanyJobsListContainer)
