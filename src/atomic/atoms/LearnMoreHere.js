import React from 'react'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

export const LearnMoreHere = () => (
  <Wrapper>
    <Trans>or learn more <Link target="_blank" href="https://www.c2su.de">here</Link></Trans>
  </Wrapper>
)

export const Wrapper = styled.small`
  display: block;
`

export const Link = styled.a`
  font-weight: bold;
  color: white;
`

export default LearnMoreHere;