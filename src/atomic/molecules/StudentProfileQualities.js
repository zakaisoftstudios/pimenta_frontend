import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import { switchLast } from '../../services/util/string'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const StudentProfileQualities = ({ skills, interests, strengths, i18n }) => {
  const qualities = [
    { name: i18n._(t`Skills`), qualityNames: qualityNames(skills, 'skill') },
    {
      name: i18n._(t`Interests`),
      qualityNames: qualityNames(interests, 'interest')
    },
    {
      name: i18n._(t`Strengths`),
      qualityNames: qualityNames(strengths, 'strength')
    }
  ]

  return (
    <Wrapper>
      {qualities.map(({ name, qualityNames }, i) => (
        <QualitySection key={i}>
          <SubHeading>{name}</SubHeading>

          <Qualities>
            {qualityNames.map((qualityName, i) => {
              const divisor = switchLast(qualityNames, i, ' •\u00A0', '')

              return <div key={i}>{`${qualityName} ${divisor}`}</div>
            })}
          </Qualities>
        </QualitySection>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const QualitySection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6.4rem;
`

const Qualities = styled.div`
  display: flex;
  color: #01c0ea;
  flex-wrap: wrap;
`

const qualityNames = (qualities, type) =>
  qualities.map(({ [type]: { label } }) => label)

export default withI18n()(StudentProfileQualities)
