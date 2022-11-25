import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import Link from '../atoms/Link'
import { Download } from 'styled-icons/feather/Download'
import { date } from '../../services/locale'
import { labelFor } from '../../constants/educationalLevels'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { t } from '@lingui/macro'

export const StudentProfileEducational = ({ educationEntries, i18n }) => (
  <Wrapper>
    <SubHeading>
      <Trans>Educational</Trans>
    </SubHeading>

    {educationEntries.length > 0 ? (
      educationEntries.map(
        ({
          from,
          to,
          school_name,
          city,
          country,
          educational_level,
          grade_point_average,
          area_of_graduation
        }) => (
          <EducationEntry>
            <h3>{`${labelFor(educational_level)}`}</h3>
            <span>
              {i18n._(t`${date(from)}`)} -{' '}
              {to ? i18n._(t`${date(to)}`) : <Trans>ongoing</Trans>}
            </span>
            <span>{school_name}</span>
            <span>{`${city}, ${country}`}</span>
            <span>
              <Trans>Average Grade: {grade_point_average}</Trans>
            </span>
            {area_of_graduation && (
              <span>
                <Trans>Area of graduation: {area_of_graduation}</Trans>
              </span>
            )}
          </EducationEntry>
        )
      )
    ) : (
      <ItalicText>
        <Trans>no educational entries</Trans>
      </ItalicText>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const EducationEntry = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;

  h3 {
    color: #01c0ea;
    margin-bottom: 0.5rem;
    font-weight: normal;
  }

  span {
    margin-bottom: 0.5rem;
  }
`

export default withI18n()(StudentProfileEducational)
