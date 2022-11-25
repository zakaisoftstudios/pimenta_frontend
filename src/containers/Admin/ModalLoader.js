import React from 'react'
import Loader from '../../atomic/atoms/Loader'
import ActionModal from '../../atomic/molecules/ActionModal'

export default function ModalLoader({handleCancel}) {
  return(
    <ActionModal
      content={
        <Loader />
      }
      actions={[]}
      handleClose={handleCancel}
    />
  )
}
