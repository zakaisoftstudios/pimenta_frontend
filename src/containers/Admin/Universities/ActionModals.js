import React from 'react'
import ActionModal from '../../../atomic/molecules/ActionModal'
import ModalLoader from '../ModalLoader'
import { Trans } from '@lingui/macro'

export default function ActionModals({
    subjectOfferToRemove,
    destroySubjectOffer,
    handleCancelRemoveSubjectOffer,
    universityToRemove,
    destroyUniversity,
    handleCancelRemoveUniversity,
    destroyLoading
  }) {
  return (
    <>
      {subjectOfferToRemove && (
        <>
          {destroyLoading ? (
            <ModalLoader
              handleCancel={handleCancelRemoveSubjectOffer}
            />
          ) : (
            <ActionModal
              content={
                <Trans>Are you sure you want to remove this Subject Offer?</Trans>
              }
              actions={[
                {
                  name: <Trans>Yes</Trans>,
                  handler: destroySubjectOffer
                }
              ]}
              handleClose={handleCancelRemoveSubjectOffer}
            />
          )}
        </>
      )}

      {universityToRemove && (
        <>
          {destroyLoading ? (
            <ModalLoader
              handleCancel={handleCancelRemoveUniversity}
            />
          ) : (
            <ActionModal
              content={
                <Trans>Are you sure you want to remove this University?</Trans>
              }
              actions={[
                {
                  name: <Trans>Yes</Trans>,
                  handler: destroyUniversity
                }
              ]}
              handleClose={handleCancelRemoveUniversity}
            />
          )}
        </>
      )}
    </>
  )
}