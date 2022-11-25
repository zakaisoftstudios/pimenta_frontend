import React from 'react'
import * as UniversityLikedFromAPI from '../../services/api/universityLikedFrom'
import UniversityLikedFrom from '../../atomic/organisms/UniversityLikedFrom'
import StudentPublicProfile from '../../atomic/organisms/StudentPublicProfile'

class UniversityLikedFromContainer extends React.Component {
  state = {
    subjectLikes: [],
    loading: false,
    studentProfileToShow: null
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const subjectLikes = await UniversityLikedFromAPI.getAll()
    this.setState({ subjectLikes, loading: false })
  }

  handleShowStudentProfile = studentProfile => () => {
    this.setState({ studentProfileToShow: studentProfile })
  }

  handleLeaveStudentProfile = () => {
    this.setState({ studentProfileToShow: null })
  }

  render() {
    const { subjectLikes, loading, studentProfileToShow } = this.state

    if (studentProfileToShow)
      return (
        <StudentPublicProfile
          profile={studentProfileToShow}
          handleReturn={this.handleLeaveStudentProfile}
        />
      )

    return (
      <UniversityLikedFrom
        subjectLikes={subjectLikes}
        loading={loading}
        handleShowStudentProfile={this.handleShowStudentProfile}
      />
    )
  }
}

export default UniversityLikedFromContainer
