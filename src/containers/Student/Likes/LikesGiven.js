import React from 'react'
import PropTypes from 'prop-types'
import * as LikesAPI from '../../../services/api/likes'
import StudentLikesGiven from '../../../atomic/organisms/StudentLikesGiven'
import jobLikeStatuses from '../../../constants/jobLikeStatuses'
import { Redirect } from 'react-router-dom'
import TrashMessageModal from '../../../atomic/molecules/TrashMessageModal'

class LikesGivenContainer extends React.Component {
  state = {
    likes: [],
    loading: true,
    goToChat: false,
    confirmRemove: false,
    likeToDestroy: '',
    isLastMatch: false
  }

  async componentDidMount() {
    this.loadItems()
  }

  loadItems = async () => {
    this.setState({ loading: true })
    const likes = await LikesAPI.getAll()
    this.setState({ likes, loading: false, showTrashModal: false })
  }

  handleJobLikeAction = like => async () => {
    switch (like.job_like_status) {
      case jobLikeStatuses.MATCHED:
        return this.goToChat()
      default:
        return
    }
  }

  handleGoToChat = () => this.setState({ goToChat: true })

  handleRemoveJobLike = like => () => {
    this.setState({
      confirmRemove: true,
      likeToDestroy: like,
      isLastMatch: this.isLastMatch(like)
    })
  }

  handleRemoveJobLikeCancel = () => {
    this.setState({ confirmRemove: false })
  }

  handleRemoveJobLikeConfirm = async () => {
    const { likeToDestroy } = this.state

    this.setState({
      confirmRemove: false,
      loading: true
    })

    const res = await LikesAPI.destroy(likeToDestroy.id)

    if (!res.error) {
      const newLikes = this.state.likes.filter(
        like => like.id !== likeToDestroy.id
      )

      this.setState({ likes: newLikes, loading: false })
    }
  }

  isLastMatch = likeToDestroy => {
    const matchCount = this.state.likes.filter(
      like =>
        like.job_offer.company_profile.id ===
          likeToDestroy.job_offer.company_profile.id &&
        (like.job_like_status === jobLikeStatuses.MATCHED ||
          like.job_like_status === jobLikeStatuses.MATCHED_FROM_HUNT)
    ).length

    if (matchCount == 0 || matchCount > 1) return false
    return true
  }

  render() {
    const {
      likes,
      loading,
      goToChat,
      likeToDestroy,
      confirmRemove,
      isLastMatch
    } = this.state
    const { handleShowJobOffer } = this.props

    if (goToChat) return <Redirect to="/student/chat" />

    return (
      <React.Fragment>
        {confirmRemove && (
          <TrashMessageModal
            targetName={likeToDestroy.job_offer.content}
            isUnmatch={isLastMatch}
            handleConfirm={this.handleRemoveJobLikeConfirm}
            handleClose={this.handleRemoveJobLikeCancel}
          />
        )}

        <StudentLikesGiven
          likes={likes}
          loading={loading}
          handleShowJobOffer={handleShowJobOffer}
          handleJobLikeAction={this.handleJobLikeAction}
          handleRemoveJobLike={this.handleRemoveJobLike}
        />
      </React.Fragment>
    )
  }
}

LikesGivenContainer.propTypes = {
  likes: PropTypes.array.isRequired
}

export default LikesGivenContainer
