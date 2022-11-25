import React from 'react'
import StudentPublicProfile from '../../../atomic/organisms/StudentPublicProfile'
import UniversityProfile from '../../../atomic/organisms/UniversityProfile'
import { Redirect } from 'react-router-dom'
import CompanyLikes from '../../../atomic/organisms/CompanyLikes'
import likesPageTabs from '../../../constants/likesPageTabs'
import SubjectDetails from '../../../atomic/organisms/SubjectDetails'

class CompanyLikesContainer extends React.Component {
  state = {
    studentProfileToShow: null,
    universityProfileToShow: null,
    subjectOfferToShow: null,
    goToChat: false,
    activeTab: likesPageTabs.LIKED_FROM
  }

  handleShowStudentProfile = studentProfile => () => {
    this.setState({ studentProfileToShow: studentProfile })
  }

  handleShowSubjectOffer = subjectOfferToShow => () => {
    this.setState({ subjectOfferToShow })
  }

  handleShowUniversityProfile = universityProfileToShow => () => {
    this.setState({ universityProfileToShow, subjectOfferToShow: null })
  }

  handleBackToLikes = () => { 
    this.setState({ studentProfileToShow: null }) 
  }

  handleGoToChat = () => this.setState({ goToChat: true })

  handleLeaveUniversityProfile = () => {
    if (this.state.subjectOfferToShow) {
      this.setState({ universityProfileToShow: null })
    } else {
      this.setState({ universityProfileToShow: null, subjectOfferToShow: null })
    }
  }

  changeTab = filter => () => this.setState({ activeTab: filter })

  render() {
    const { 
      subjectOfferToShow,
      universityProfileToShow,
      studentProfileToShow,
      goToChat,
      activeTab
    } = this.state

    if (goToChat) return <Redirect to="/company/chat" />

    if (studentProfileToShow)
      return (
        <StudentPublicProfile
          profile={studentProfileToShow}
          handleReturn={this.handleBackToLikes}
          publicProfile
        />
      )

    if (subjectOfferToShow)
      return (
        <SubjectDetails
          subjectOffer={subjectOfferToShow}
          handleReturn={this.handleShowSubjectOffer(null)}
          canEdit={false}
          canSeeApplicants={false}
          handleShowUniversityProfile={this.handleShowUniversityProfile(
            subjectOfferToShow.university_profile
          )}
        />
      )

    if (universityProfileToShow) {
      return (
        <UniversityProfile
          profile={universityProfileToShow}
          handleReturn={this.handleLeaveUniversityProfile}
          ready
          canEdit={false}
        />
      )
    }

    return (
      <CompanyLikes
        handleShowStudentProfile={this.handleShowStudentProfile}
        handleShowSubjectOffer={this.handleShowSubjectOffer}
        handleGoToChat={this.handleGoToChat}
        changeTab={this.changeTab}
        activeTab={activeTab}
      />
    )
  }
}

export default CompanyLikesContainer
