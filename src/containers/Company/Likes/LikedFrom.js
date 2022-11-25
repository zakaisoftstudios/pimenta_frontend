import React from 'react'
import * as LikedFromAPI from '../../../services/api/likedFrom'
import * as LikeBackAPI from '../../../services/api/likeBack'
import CompanyLikedFrom from '../../../atomic/organisms/CompanyLikedFrom'
import likeStatuses from '../../../constants/likeStatuses'
import { Redirect } from 'react-router-dom'
import TrashMessageModal from '../../../atomic/molecules/TrashMessageModal'

class LikedFromContainer extends React.Component {
  state = {
    likers: [],
    loading: true,
    likerToDestroy: null,
    confirmRemove: false,
    goToChat: false
  }

  async componentDidMount() {
    this.loadItems()
  }

  loadItems = async () => {
    this.setState({ loading: true })
    const likers = await LikedFromAPI.getAll()
    this.setState({ likers, loading: false, showTrashModal: false })
  }

  handleLikeAction = liker => async () => {
    switch (liker.like_status) {
      case likeStatuses.MATCHED:
        this.goToChat()
      case likeStatuses.MATCHED_FROM_HUNT:
        this.goToChat()
      case likeStatuses.STUDENT_LIKED:
        this.likeBack(liker)
      case likeStatuses.NONE:
        return
    }
  }

  likeBack = async liker => {
    const res = await LikeBackAPI.post(liker.id)

    if (!res.error) {
      const { likers } = this.state

      const newLikers = likers.map(currentLiker =>
        currentLiker.id === liker.id
          ? { ...liker, like_status: likeStatuses.MATCHED }
          : currentLiker
      )

      this.setState({ likers: newLikers })
    }
  }

  goToChat = () => this.setState({ goToChat: true })

  handleRemoveLiker = liker => () => {
    this.setState({
      confirmRemove: true,
      likerToDestroy: liker,
      isLastMatch: liker.like_status == likeStatuses.MATCHED
    })
  }

  handleRemoveLikerCancel = () => {
    this.setState({ confirmRemove: false })
  }

  handleRemoveLikerConfirm = async () => {
    const { likerToDestroy } = this.state

    const res = await LikedFromAPI.destroy(likerToDestroy.id)

    if (!res.error) {
      this.setState({
        confirmRemove: false
      })

      this.loadItems()
    }
  }

  render() {
    const {
      likers,
      loading,
      confirmRemove,
      likerToDestroy,
      goToChat,
      isLastMatch
    } = this.state

    if (goToChat) return <Redirect to="/company/chat" />

    const trashModal = confirmRemove && (
      <TrashMessageModal
        targetName={likerToDestroy.name}
        isUnmatch={isLastMatch}
        handleConfirm={this.handleRemoveLikerConfirm}
        handleClose={this.handleRemoveLikerCancel}
      />
    )

    return (
      <CompanyLikedFrom
        likers={likers}
        loading={loading}
        handleShowStudentProfile={this.props.handleShowStudentProfile}
        trashModal={trashModal}
        confirmRemove={confirmRemove}
        handleRemoveLiker={this.handleRemoveLiker}
        handleLikeAction={this.handleLikeAction}
      />
    )
  }
}

export default LikedFromContainer
