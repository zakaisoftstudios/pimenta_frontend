import React from 'react'
import styled from 'styled-components'
import StudentCard from '../molecules/StudentCard'
import Loader from '../atoms/Loader'
import CompanyHuntedActions from '../molecules/CompanyHuntedActions'
import ItalicText from '../atoms/ItalicText'
import huntStatuses from '../../constants//huntStatuses'
import { Trans } from '@lingui/macro'

const CompanyHunted = ({
  huntingList,
  loading,
  handleRemoveHunt,
  handleShowStudentProfile,
  handleGoToChat
}) =>
  loading ? (
    <Loader />
  ) : (
    <Wrapper>
      {huntingList.length > 0 ? (
        huntingList.map(hunt => (
          <StudentCard
            rejected={hunt.hunt_status === huntStatuses.REJECTED}
            key={hunt.id}
            profile={hunt.student_profile}
            handleShowStudentProfile={handleShowStudentProfile(
              hunt.student_profile
            )}
            actions={
              <CompanyHuntedActions
                handleRemoveHunt={handleRemoveHunt(hunt)}
                huntStatus={hunt.hunt_status}
                handleGoToChat={handleGoToChat}
              />
            }
          />
        ))
      ) : (
        <ItalicText>
          <Trans>you haven't hunted anyone yet</Trans>
        </ItalicText>
      )}
    </Wrapper>
  )

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

export default CompanyHunted
