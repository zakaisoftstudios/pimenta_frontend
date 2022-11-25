import React from 'react'
import StudentLikes from '../../../atomic/organisms/StudentLikes'
import CompanyProfile from '../../../atomic/organisms/CompanyProfile'
import UniversityProfile from '../../../atomic/organisms/UniversityProfile'
import JobDetails from '../../../atomic/organisms/JobDetails'
import { Redirect } from 'react-router-dom'
import likesPageTabs from '../../../constants/likesPageTabs'
import SubjectDetails from '../../../atomic/organisms/SubjectDetails'

class StudentLikesContainer extends React.Component {
  state = {
    companyProfileToShow: null,
    universityProfileToShow: null,
    jobOfferToShow: null,
    subjectOfferToShow: null,
    goToChat: false,
    activeTab: likesPageTabs.LIKED
  }

  handleShowCompanyProfile = companyProfileToShow => () => {
    this.setState({ companyProfileToShow })
  }

  handleShowUniversityProfile = universityProfileToShow => () => {
    this.setState({ universityProfileToShow })
  }

  handleShowJobOffer = jobOfferToShow => () => {
    this.setState({ jobOfferToShow })
  }

  handleShowSubjectOffer = subjectOfferToShow => () => {
    this.setState({ subjectOfferToShow })
  }

  handleGoToChat = () => this.setState({ goToChat: true })

  handleLeaveCompanyProfile = () => {
    if (this.state.jobOfferToShow) {
      this.setState({ companyProfileToShow: null })
    } else {
      this.setState({ companyProfileToShow: null, jobOfferToShow: null })
    }
  }

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
      companyProfileToShow,
      universityProfileToShow,
      jobOfferToShow,
      subjectOfferToShow,
      goToChat,
      activeTab
    } = this.state

    if (goToChat) return <Redirect to="/student/chat" />

    if (companyProfileToShow) {
      return (
        <CompanyProfile
          profile={companyProfileToShow}
          handleReturn={this.handleLeaveCompanyProfile}
          ready
          canEdit={false}
        />
      )
    }

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

    if (jobOfferToShow)
      return (
        <JobDetails
          jobOffer={jobOfferToShow}
          handleReturn={this.handleShowJobOffer(null)}
          canEdit={false}
          canSeeApplicants={false}
          handleShowCompanyProfile={this.handleShowCompanyProfile(
            jobOfferToShow.company_profile
          )}
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

    return (
      <StudentLikes
        handleShowJobOffer={this.handleShowJobOffer}
        handleShowSubjectOffer={this.handleShowSubjectOffer}
        handleShowCompanyProfile={this.handleShowCompanyProfile}
        handleGoToChat={this.handleGoToChat}
        changeTab={this.changeTab}
        activeTab={activeTab}
      />
    )
  }
}

export default StudentLikesContainer
