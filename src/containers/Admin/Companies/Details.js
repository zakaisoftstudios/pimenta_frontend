import React from 'react'
import CompanyProfile from '../../../atomic/organisms/CompanyProfile'
import { StyledJobDetails } from '../styles'

export default function Details({
  jobOfferToShow,
  handleLeaveJobOffer,
  handleShowCompanyProfile,
  companyProfileToShow,
  handleLeaveCompanyProfile
}) {
  if (jobOfferToShow) {
    return (
      <StyledJobDetails
        jobOffer={jobOfferToShow}
        handleReturn={handleLeaveJobOffer}
        handleShowCompanyProfile={handleShowCompanyProfile}
        canSeeApplicants={false}
        canEdit={false}
      />
    )
  }

  if (companyProfileToShow) {
    return (
      <CompanyProfile
        profile={companyProfileToShow}
        ready={true}
        canEdit={false}
        handleReturn={handleLeaveCompanyProfile}
        forMobile={true}
      />
    )
  }
}

