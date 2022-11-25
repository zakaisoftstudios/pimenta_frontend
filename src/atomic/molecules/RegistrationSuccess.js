import React from 'react'
import CenteredWrapper from '../atoms/CenteredWrapper'
import { Trans } from '@lingui/macro'

export default () => (
  <CenteredWrapper>
    <p>
      <Trans>Successfull registration! We sent you a confirmation email.</Trans>
    </p>
  </CenteredWrapper>
)
