import React from 'react'
import styled from 'styled-components'
import CompanyCard from '../molecules/CompanyCard'
import Loader from '../atoms/Loader'
import ItalicText from '../atoms/ItalicText'
import StudentHuntedByActions from '../molecules/StudentHuntedByActions'
import { Trans } from '@lingui/macro'

const StudentHunted = ({
  huntingList,
  loading,
  handleShowCompanyProfile,
  handleShowJobOffer,
  handleRemoveHunt,
  handleLikeAction
}) =>
  loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {huntingList.length > 0 ? (
        huntingList.map(hunt => (
          <CompanyCard
            key={hunt.id}
            profile={hunt.company_profile}
            jobOffers={hunt.job_offers}
            handleShowCompanyProfile={handleShowCompanyProfile(
              hunt.company_profile
            )}
            handleShowJobOffer={handleShowJobOffer}
            actions={
              <StudentHuntedByActions
                handleLikeAction={handleLikeAction(hunt)}
                huntStatus={hunt.hunt_status}
                handleRemoveHunt={handleRemoveHunt(hunt)}
              />
            }
          />
        ))
      ) : (
        <ItalicText>
          <Trans>you haven't been hunted by any company yet</Trans>
        </ItalicText>
      )}
    </Wrapper>
  )

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export default StudentHunted
