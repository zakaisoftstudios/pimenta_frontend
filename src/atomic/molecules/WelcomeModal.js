import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import ButtonBar from './ButtonBar'
import { breakpoints } from '../../constants/responsive'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

export const WelcomeModal = withI18n()(({ handleClose, i18n }) => (
  <Modal onClose={handleClose} title={i18n._(t`Welcome to jobyneo!`)}>
    <ModalContent>
      <p>
        <Trans>
          In order to start using our awesome features, please complete your
          profile information.
        </Trans>
      </p>

      <ButtonBar>
        <ButtonRounded handleClick={handleClose} small>
          <Trans>Continue</Trans>
        </ButtonRounded>
      </ButtonBar>
    </ModalContent>
  </Modal>
))

const ModalContent = styled.div`
  p {
    text-align: left;
    padding: 0 2.5rem;
    font-size: 1.8rem;

    @media screen and (min-width: ${breakpoints.sm}) {
      max-width: 50rem;
    }
  }
`
