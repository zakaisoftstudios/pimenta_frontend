import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import ButtonBar from './ButtonBar'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const ActionModal = ({ handleClose, actions, content, title, i18n }) => (
  <Modal onClose={handleClose} title={title || i18n._(t`Are you sure?`)}>
    <p>{content}</p>

    <ButtonBar>
      <ButtonRounded handleClick={handleClose} small ghost>
        <Trans>Cancel</Trans>
      </ButtonRounded>

      {actions.map(({ name, handler }, i) => (
        <ButtonRounded key={i} handleClick={handler} small>
          {name}
        </ButtonRounded>
      ))}
    </ButtonBar>
  </Modal>
)

export default withI18n()(ActionModal)
