import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import ButtonBar from './ButtonBar'
import { breakpoints } from '../../constants/responsive'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

export const matchMessageTo = {
  COMPANY: 'company',
  STUDENT: 'student'
}

const MatchMessageModal = ({ handleClose, to, i18n }) => (
  <Modal onClose={handleClose} title={i18n._(t`You have a new match!`)}>
    {to === matchMessageTo.COMPANY && (
      <p>
        <Trans>
          You hunted a student who have already liked one of your job offers,
          and now you can chat to each other.
        </Trans>
      </p>
    )}

    {to === matchMessageTo.STUDENT && (
      <p>
        <Trans>
          You liked a job from a company which already liked you too, and now
          you can chat to each other.
        </Trans>
      </p>
    )}

    <ButtonBar>
      <ButtonRounded handleClick={handleClose} small>
        <Trans>Continue</Trans>
      </ButtonRounded>
    </ButtonBar>
  </Modal>
)

export default withI18n()(MatchMessageModal)
