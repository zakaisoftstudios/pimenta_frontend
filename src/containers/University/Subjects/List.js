import React from 'react'
import * as SubjectOffersAPI from '../../../services/api/subjectOffers'
import SubjectListing from '../../../atomic/organisms/SubjectListing'
import SubjectDetails from '../../../atomic/organisms/SubjectDetails'
import { connect } from 'react-redux'
import { subjectOfferStates } from '../../../constants/subjectOfferStates'
import Pagination from '../../../atomic/molecules/Pagination'
import ActionModal from '../../../atomic/molecules/ActionModal'
import { Trans } from '@lingui/macro'

const FIRST_PAGE = 1

class UniversitySubjectsListContainer extends React.Component {
  state = {
    subjectOffers: [],
    loadingSubjectOffers: true,
    stateFilter: subjectOfferStates.PUBLISHED,
    subjectToShow: null,
    activePage: 1,
    totalItemsCount: 0,
    removeSubjectOfferId: null
  }

  async componentDidMount() {
    const { stateFilter } = this.state
    await this.loadSubjectOffers(stateFilter, FIRST_PAGE)
  }

  loadSubjectOffers = async (stateFilter, pageNumber) => {
    this.setState({ loadingSubjectOffers: true })

    const subjectOffers = await SubjectOffersAPI.getAll(stateFilter, pageNumber)

    this.setState({
      loadingSubjectOffers: false,
      subjectOffers,
      totalItemsCount: this.gettotalItemsCount(subjectOffers),
      stateFilter
    })
  }

  gettotalItemsCount = subjectOffers =>
    subjectOffers.length > 0 ? subjectOffers[0].total_items_count : 0

  filteredSubjectOffers = () => {
    const { subjectOffers, stateFilter } = this.state
    return subjectOffers.filter(
      subjectOffer => subjectOffer.state === stateFilter
    )
  }

  changeFilter = stateFilter => async () =>
    await this.loadSubjectOffers(stateFilter, FIRST_PAGE)

  showSubjectDetails = subjectToShow => () => this.setState({ subjectToShow })

  handlePageChangeCallback = async pageNumber => {
    const { stateFilter } = this.state
    await this.loadSubjectOffers(stateFilter, pageNumber)
  }

  handleRemoveSubjectOffer = removeSubjectOfferId => () => {
    this.setState({ removeSubjectOfferId })
  }

  handleConfirmRemoveSubjectOffer = async () => {
    const { stateFilter, activePage, removeSubjectOfferId } = this.state

    this.setState({ removeSubjectOfferId: null, loadingSubjectOffers: true })
    await SubjectOffersAPI.destroy(removeSubjectOfferId)
    await this.loadSubjectOffers(stateFilter, activePage)
  }

  handleCancelRemoveSubjectOffer = () =>
    this.setState({ removeSubjectOfferId: null })

  render() {
    const {
      subjectOffers,
      loadingSubjectOffers,
      stateFilter,
      subjectToShow,
      totalItemsCount,
      removeSubjectOfferId
    } = this.state

    const { profilePic, userName } = this.props

    if (subjectToShow)
      return (
        <SubjectDetails
          subjectOffer={subjectToShow}
          handleReturn={this.showSubjectDetails(null)}
        />
      )

    return (
      subjectOffers && (
        <React.Fragment>
          {removeSubjectOfferId && (
            <ActionModal
              content={
                <Trans>
                  Are you sure you want to remove this Subject Offer?
                </Trans>
              }
              actions={[
                {
                  name: <Trans>Yes</Trans>,
                  handler: this.handleConfirmRemoveSubjectOffer
                }
              ]}
              handleClose={this.handleCancelRemoveSubjectOffer}
            />
          )}

          <Pagination
            totalItemsCount={totalItemsCount}
            handlePageChangeCallback={this.handlePageChangeCallback}
          >
            {({ paginationComponent }) => (
              <SubjectListing
                loadingSubjectOffers={loadingSubjectOffers}
                subjectOffers={this.filteredSubjectOffers()}
                profilePic={profilePic}
                userName={userName}
                stateFilter={stateFilter}
                changeFilter={this.changeFilter}
                showSubjectDetails={this.showSubjectDetails}
                paginationComponent={paginationComponent}
                totalItemsCount={totalItemsCount}
                handleRemoveSubjectOffer={this.handleRemoveSubjectOffer}
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
)(UniversitySubjectsListContainer)
