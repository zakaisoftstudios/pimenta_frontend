import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import GalleryAttachment from './GalleryAttachment'
import { getForGallery } from '../../services/attachments'
import { Trans } from '@lingui/macro'

const GalleryForm = ({
  attachments,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader,
  type
}) => (
  <Wrapper>
    <SubHeading largeMarginBottom>
      <Trans>Gallery</Trans>
    </SubHeading>

    {getForGallery(attachments, type).map(attachment => (
      <GalleryAttachment
        key={attachment.id}
        handleShowImageUploader={handleShowImageUploader}
        handleDeleteAttachment={handleDeleteAttachment}
        handleShowVideoUploader={handleShowVideoUploader}
        attachment={attachment}
      />
    ))}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default GalleryForm
