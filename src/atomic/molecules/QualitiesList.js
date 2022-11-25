import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import { Trans } from '@lingui/macro'

export default ({ title, type, qualities }) => {
  const mustHave = getMustHave(qualities)
  const niceToHave = getNiceToHave(qualities)

  return (
    <Wrapper>
      <SubHeading>{title}</SubHeading>

      <Block>
        <Category>
          <Trans>Must have:</Trans>{' '}
        </Category>
        <Qualities>{mapQualities(mustHave, type)}</Qualities>
      </Block>

      <Block>
        <Category>
          <Trans>Can have:</Trans>{' '}
        </Category>
        {niceToHave.length > 0 ? (
          <Qualities>{mapQualities(niceToHave, type)}</Qualities>
        ) : (
          <Trans>none</Trans>
        )}
      </Block>
    </Wrapper>
  )
}

const getMustHave = qualities => qualities.filter(quality => quality.must_have)

const getNiceToHave = qualities =>
  qualities.filter(quality => !quality.must_have)

const mapQualities = (qualities, type) =>
  qualities.map((quality, i) => (
    <Quality key={i}>
      {`${quality[type].label}${i + 1 === qualities.length ? '.' : ','} \u00A0`}
    </Quality>
  ))

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const Block = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
`

const Qualities = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const Quality = styled.div`
  color: #01c0ea;
`

const Category = styled.div`
  font-style: italic;
  margin-right: 0.5rem;
  flex-shrink: 0;
`
