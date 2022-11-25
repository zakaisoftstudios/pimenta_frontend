import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import Link from '../atoms/Link'
import { Download } from 'styled-icons/feather/Download'
import { date } from '../../services/locale'
import { label } from '../../constants/workExperienceTypes'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { t } from '@lingui/macro'

export const StudentProfileProfessional = ({ workExperiences, i18n }) => (
  <Wrapper>
    <SubHeading>
      <Trans>Professional</Trans>
    </SubHeading>

    {workExperiences.length > 0 ? (
      workExperiences.map(
        ({
          from,
          to,
          title,
          department,
          company_name,
          country,
          city,
          tasks,
          kind
        }) => (
          <ProfessionalEntry>
            <h3>{title}</h3>
            {department && <h4>{department}</h4>}

            <span>
              {i18n._(t`${date(from)}`)} -{' '}
              {to ? i18n._(t`${date(to)}`) : <Trans>ongoing</Trans>}
            </span>
            <span>
              <Trans>
                {label(kind)} at {company_name}
              </Trans>
            </span>
            <span>{`${city}, ${country}`}</span>
            <span>{tasks}</span>
          </ProfessionalEntry>
        )
      )
    ) : (
      <ItalicText>
        <Trans>no professional entries</Trans>
      </ItalicText>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
`

const ProfessionalEntry = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;

  h3 {
    color: #01c0ea;
    margin-bottom: 0.2rem;
    font-weight: normal;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  span {
    margin-bottom: 0.5rem;
  }

  span:last-of-type {
    margin-top: 1.2rem;
  }
`

export default withI18n()(StudentProfileProfessional)
