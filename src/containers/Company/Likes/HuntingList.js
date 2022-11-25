import React from 'react'
import * as HuntsAPI from '../../../services/api/hunts'
import CompanyHunted from '../../../atomic/organisms/CompanyHunted'
import ActionModal from '../../../atomic/molecules/ActionModal'
import huntStatuses from '../../../constants/huntStatuses'
import TrashMessageModal from '../../../atomic/molecules/TrashMessageModal'

class CompanyHuntingListContainer extends React.Component {
  state = {
    huntingList: [],
    loading: true,
    confirmRemove: false,
    huntToRemove: null
  }

  handleRemoveHunt = huntToRemove => () => {
    this.setState({ confirmRemove: true, huntToRemove })
  }

  handleRemoveCancel = () => {
    this.setState({ confirmRemove: false })
  }

  handleRemoveConfirm = async () => {
    this.setState({ confirmRemove: false })

    const { huntingList, huntToRemove } = this.state
    const res = await HuntsAPI.destroy(huntToRemove.id)

    if (!res.error) {
      const newHuntingList = huntingList.filter(
        hunting => hunting.id !== huntToRemove.id
      )

      this.setState({ huntingList: newHuntingList })
    }
  }

  async componentDidMount() {
    const huntingList = await HuntsAPI.getAll()
    this.setState({ huntingList, loading: false })
  }

  render() {
    const { huntingList, loading, huntToRemove, confirmRemove } = this.state

    return (
      <React.Fragment>
        {confirmRemove && (
          <TrashMessageModal
            targetName={huntToRemove.student_profile.name}
            isUnmatch={huntToRemove.hunt_status === huntStatuses.MATCHED}
            handleConfirm={this.handleRemoveConfirm}
            handleClose={this.handleRemoveCancel}
          />
        )}

        <CompanyHunted
          huntingList={huntingList}
          loading={loading}
          handleRemoveHunt={this.handleRemoveHunt}
          handleShowStudentProfile={this.props.handleShowStudentProfile}
          handleGoToChat={this.props.handleGoToChat}
        />
      </React.Fragment>
    )
  }
}

export default CompanyHuntingListContainer
