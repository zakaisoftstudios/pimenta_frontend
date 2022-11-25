import React from 'react'
import PropTypes from 'prop-types'
import * as HuntedByAPI from '../../../services/api/huntedBy'
import * as HuntLikesAPI from '../../../services/api/huntLikes'
import StudentHunted from '../../../atomic/organisms/StudentHunted'
import huntStatuses from '../../../constants/huntStatuses'
import { Redirect } from 'react-router-dom'
import TrashMessageModal from '../../../atomic/molecules/TrashMessageModal'

class HuntedByContainer extends React.Component {
  state = {
    hunts: [],
    confirmRemove: false,
    huntToRemove: null,
    loading: true,
    goToChat: false
  }

  async componentDidMount() {
    this.loadItems()
  }

  loadItems = async () => {
    this.setState({ loading: true })
    const hunts = await HuntedByAPI.getAll()
    this.setState({ hunts, loading: false })
  }

  handleLikeAction = hunt => async () => {
    switch (hunt.hunt_status) {
      case huntStatuses.MATCHED:
        this.goToChat()
      case huntStatuses.HUNTED:
        this.likeBack(hunt)
      case huntStatuses.NONE:
        return
    }
  }

  goToChat = () => this.setState({ goToChat: true })

  likeBack = async hunt => {
    const newHunt = await HuntLikesAPI.post(hunt.id)

    if (!newHunt.error) {
      const { hunts } = this.state

      const newHunts = hunts.map(hunt =>
        hunt.id === newHunt.id ? newHunt : hunt
      )

      this.setState({ hunts: newHunts, showTrashModal: false })
    }
  }

  handleRemoveConfirm = async () => {
    const {
      huntToRemove: { id }
    } = this.state

    this.setState({ confirmRemove: false, loading: true })
    const res = await HuntLikesAPI.destroy(id)

    if (!res.error) {
      this.loadItems()
    }

    this.setState({ loading: true })
  }

  handleRemoveHunt = huntToRemove => () => {
    this.setState({ confirmRemove: true, huntToRemove })
  }

  handleRemoveCancel = () => {
    this.setState({ confirmRemove: false })
  }

  render() {
    const { hunts, confirmRemove, loading, goToChat, huntToRemove } = this.state
    const { handleShowCompanyProfile, handleShowJobOffer } = this.props

    if (goToChat) return <Redirect to="/student/chat" />

    return (
      <React.Fragment>
        <StudentHunted
          huntingList={hunts}
          loading={loading}
          handleShowCompanyProfile={handleShowCompanyProfile}
          handleLikeAction={this.handleLikeAction}
          handleRemoveHunt={this.handleRemoveHunt}
          handleShowJobOffer={handleShowJobOffer}
        />

        {confirmRemove && (
          <TrashMessageModal
            targetName={huntToRemove.company_profile.name}
            isUnmatch={huntToRemove.hunt_status === huntStatuses.MATCHED}
            handleConfirm={this.handleRemoveConfirm}
            handleClose={this.handleRemoveCancel}
          />
        )}
      </React.Fragment>
    )
  }
}

HuntedByContainer.propTypes = {
  hunts: PropTypes.array.isRequired
}

export default HuntedByContainer
