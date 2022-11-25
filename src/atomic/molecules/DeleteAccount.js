import React, { useState } from 'react'
import styled from 'styled-components'
import Heading from '../atoms/Heading'
import ActionModal from '../molecules/ActionModal'
import Button from '../atoms/Button'
import * as DeleteAccountAPI from '../../services/api/deleteAccount'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

export function DeleteAccount({ i18n }) {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => setShowModal(!showModal)

  const handleConfirm = async () => {
    const res = await DeleteAccountAPI.destroy()
    if (!res.error) {
      window.location.reload()
    }
  }

  return(
    <>
    <Wrapper>
      <Heading>
        <Trans>Do you want to delete your account?</Trans>
      </Heading>
      <Button handleClick={toggleShowModal}>
        <Trans>Delete Account</Trans>
      </Button>
    </Wrapper>
    { showModal && (
        <ActionModal
        handleClose={toggleShowModal}
        content={
          <div>
            <Trans>
              By doing this, you will delete all data from your account, without going back
            </Trans>
          </div>
        }
        actions={[{ name: i18n._(t`Confirm`), handler: handleConfirm }]}
        />
      )
    }
  </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.4rem;
`

export default withI18n()(DeleteAccount)
