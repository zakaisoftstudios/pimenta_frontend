import React from 'react'
import * as SubjectLikesAPI from '../../../services/api/subjectLikes'
import CompanySubjectLikes from '../../../atomic/organisms/CompanySubjectLikes'
import TrashMessageModal from '../../../atomic/molecules/TrashMessageModal'

class SubjectLikesContainer extends React.Component {
  state = {
    subjectLikes: [],
    loading: true,
    confirmRemove: false,
    subjectLikeToDestroy: null
  }

  componentDidMount() {
    this.loadItems()
  }

  loadItems = async () => {
    this.setState({ loading: true })
    const subjectLikes = await SubjectLikesAPI.getAll()
    this.setState({ subjectLikes, loading: false, showTrashModal: false })
  }

  handleRemoveSubjectLike = subjectLike => () =>
    this.setState({
      confirmRemove: true,
      subjectLikeToDestroy: subjectLike
    })

  handleRemoveSubjectLikeCancel = () => {
    this.setState({ confirmRemove: false })
  }

  handleRemoveSubjectLikeConfirm = async () => {
    const { subjectLikeToDestroy } = this.state

    this.setState({
      confirmRemove: false,
      loading: true
    })

    const res = await SubjectLikesAPI.destroy(subjectLikeToDestroy.id)

    if (!res.error) {
      const newSubjectLikes = this.state.subjectLikes.filter(
        subjectLike => subjectLike.id !== subjectLikeToDestroy.id
      )

      this.setState({ subjectLikes: newSubjectLikes, loading: false })
    }
  }

  render() {
    const {
      subjectLikes,
      loading,
      confirmRemove,
      subjectLikeToDestroy
    } = this.state

    const { handleShowSubjectOffer, handleShowUniversityProfile } = this.props

    return (
      <React.Fragment>
        {confirmRemove && (
          <TrashMessageModal
            targetName={subjectLikeToDestroy.subject_offer.name}
            handleConfirm={this.handleRemoveSubjectLikeConfirm}
            handleClose={this.handleRemoveSubjectLikeCancel}
          />
        )}

        <CompanySubjectLikes
          subjectLikes={subjectLikes}
          loading={loading}
          handleShowSubjectOffer={handleShowSubjectOffer}
          handleShowUniversityProfile={handleShowUniversityProfile}
          handleRemoveSubjectLike={this.handleRemoveSubjectLike}
        />
      </React.Fragment>
    )
  }
}

export default SubjectLikesContainer
