import React from 'react'
import styled from 'styled-components'
import { percentage } from '../../services/locale'
import { Trans } from '@lingui/macro'

const OfferMatchPercentage = ({ children, className }) =>
  (children || children === 0) && (
    <Wrapper>
      <Trans>{percentage(children)} match</Trans>
    </Wrapper>
  )

const Wrapper = styled.div`
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #21c8ed;
  position: absolute;
  bottom: 7px;
  right: 5px;
  color: #21c8ed;
  font-size: 1.1rem;
`

export default OfferMatchPercentage
