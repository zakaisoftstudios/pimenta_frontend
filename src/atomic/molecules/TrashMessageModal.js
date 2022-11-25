import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import ButtonBar from './ButtonBar'
import ActionModal from './ActionModal'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const TrashMessageModal = ({
  handleClose,
  targetName,
  isUnmatch,
  handleConfirm,
  i18n
}) => (
  <ActionModal
    handleClose={handleClose}
    content={
      <div>
        <Trans>
          Do you want to remove <b>{targetName}</b>?
        </Trans>{' '}
        {removeMessage(isUnmatch, i18n)}
      </div>
    }
    actions={[{ name: i18n._(t`Confirm`), handler: handleConfirm }]}
  />
)

const removeMessage = (isUnmatch, i18n) =>
  isUnmatch
    ? i18n._(
        t`The match will be undone and your conversations will be removed.`
      )
    : i18n._(t`It will no longer appear in your list.`)

export default withI18n()(TrashMessageModal)
