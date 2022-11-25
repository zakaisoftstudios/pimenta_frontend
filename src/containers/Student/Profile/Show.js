import React from 'react'
import * as StudentProfileAPI from '../../../services/api/studentProfile'
import StudentProfile from '../../../atomic/organisms/StudentProfile'
import Loader from '../../../atomic/atoms/Loader'

class StudentProfileShowContainer extends React.Component {
  state = {
    studentProfile: null
  }

  async componentDidMount() {
    const studentProfile = await StudentProfileAPI.get()
    this.setState({ studentProfile })
  }

  render() {
    const { studentProfile } = this.state
    return studentProfile ? (
      <StudentProfile profile={studentProfile} />
    ) : (
      <Loader />
    )
  }
}

export default StudentProfileShowContainer
