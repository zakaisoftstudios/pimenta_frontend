import React from 'react'
import ActionModal from '../../../atomic/molecules/ActionModal'
import ModalLoader from '../ModalLoader'
import { Trans } from '@lingui/macro'

export default function ActionModals({
    studentToRemove,
    destroyStudent,
    handleCancelRemoveStudent,
    destroyLoading
  }) {
  return (
    <>
      {studentToRemove && (
          <>
            {destroyLoading ? (
              <ModalLoader
                handleCancel={handleCancelRemoveStudent}
              />
            ) : (
              <ActionModal
                content={
                  <Trans>Are you sure you want to remove this Student?</Trans>
                }
                actions={[
                  {
                    name: <Trans>Yes</Trans>,
                    handler: destroyStudent
                  }
                ]}
                handleClose={handleCancelRemoveStudent}
              />
            )}
        </>
      )}
    </>
  )
}