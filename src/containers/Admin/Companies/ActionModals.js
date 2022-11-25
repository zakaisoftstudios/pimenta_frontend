import React from 'react'
import ActionModal from '../../../atomic/molecules/ActionModal'
import ModalLoader from '../ModalLoader'
import { Trans } from '@lingui/macro'
import Loader from '../../../atomic/atoms/Loader'

export default function ActionModals({
    jobOfferToRemove,
    destroyJobOffer,
    handleCancelRemoveJobOffer,
    companyToRemove,
    destroyCompany,
    destroyLoading,
    handleCancelRemoveCompany
  }) {

  return (
    <>
      {jobOfferToRemove && (
        <>
          {destroyLoading ? (
            <ModalLoader
              handleCancel={handleCancelRemoveCompany}
            />
          ) : (
          <ActionModal
            content={
              <Trans>Are you sure you want to remove this Subject Offer?</Trans>
            }
            actions={[
              {
                name: <Trans>Yes</Trans>,
                handler: destroyJobOffer
              }
            ]}
            handleClose={handleCancelRemoveJobOffer}
          />
          )}
        </>
      )}

      {companyToRemove && (
        <>
          {destroyLoading ? (
            <ActionModal
              content={
                <Loader />
              }
              actions={[]}
              handleClose={handleCancelRemoveCompany}
            />
          ) : (
            <ActionModal
              content={
                <Trans>Are you sure you want to remove this Company?</Trans>
              }
              actions={[
                {
                  name: <Trans>Yes</Trans>,
                  handler: destroyCompany
                }
              ]}
              handleClose={handleCancelRemoveCompany}
            />
          )}
        </>
      )}
    </>
  )
}
