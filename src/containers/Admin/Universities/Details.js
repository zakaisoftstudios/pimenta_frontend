import React from 'react'
import UniversityProfile from '../../../atomic/organisms/UniversityProfile'
import { StyledSubjectDetails } from '../styles'

export default function Details({
  subjectOfferToShow,
  handleLeaveSubjectOffer,
  handleShowUniversityProfile,
  universityProfileToShow,
  handleLeaveUniversityProfile
}) {
  if (subjectOfferToShow) {
    return (
      <StyledSubjectDetails
        subjectOffer={subjectOfferToShow}
        handleReturn={handleLeaveSubjectOffer}
        handleShowUniversityProfile={handleShowUniversityProfile}
        canSeeApplicants={false}
        canEdit={false}
      />
    )
  }

  if (universityProfileToShow) {
    return (
      <UniversityProfile
        profile={universityProfileToShow}
        ready={true}
        canEdit={false}
        handleReturn={handleLeaveUniversityProfile}
        forMobile={true}
      />
    )
  }
}
