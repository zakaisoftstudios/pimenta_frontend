import React from 'react'
import StudentPublicProfile from '../../../atomic/organisms/StudentPublicProfile'

export default function Details({
  studentProfileToShow,
  handleLeaveStudentProfile
}) {
  if (studentProfileToShow) {
    return (
      <StudentPublicProfile
        profile={studentProfileToShow}
        handleReturn={handleLeaveStudentProfile}
        publicProfile
      />
    )
  }
}
