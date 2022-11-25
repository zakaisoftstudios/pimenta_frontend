import React from 'react'
import styled from 'styled-components'
import { getTypeFromAttachment } from '../../services/attachments'
import ButtonText from '../atoms/ButtonText'
import blankProfilePic from '../../assets/blank-profile-pic.svg'
import VideoPlayer from './VideoPlayer'
import editRoundedIcon from '../../assets/icons/edit-rounded.svg'
import { Trans } from '@lingui/macro'

const GalleryAttachment = ({
  attachment,
  handleShowImageUploader,
  handleDeleteAttachment,
  handleShowVideoUploader
}) => {
  const attachmentType = getTypeFromAttachment(attachment)

  return (
    <Wrapper>
      {attachment.purpose === 'video' ? (
        <Box>
          {attachment.video_url ? (
            <VideoPlayer src={attachment.video_url} noPlay />
          ) : (
            <Thumb src={blankProfilePic} />
          )}

          <EditButton
            src={editRoundedIcon}
            alt="Edit video"
            onClick={handleShowVideoUploader({
              attachmentId: attachment.id
            })}
          />
        </Box>
      ) : (
        <Box>
          <Thumb src={attachment.picture_url || blankProfilePic} />

          <EditButton
            src={editRoundedIcon}
            alt="Edit Image"
            onClick={handleShowImageUploader({
              imageType: attachmentType,
              attachmentId: attachment.id
            })}
          />
        </Box>
      )}

      <Title>{attachmentType.title}</Title>

      <StyledButtonText handleClick={handleDeleteAttachment(attachment.id)}>
        <Trans>Delete</Trans>
      </StyledButtonText>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  align-items: center;
`

const Thumb = styled.img`
  width: 7rem;
  height: 5.8rem;
  object-fit: cover;
`

const Box = styled.div`
  width: 7rem;
  height: 5.8rem;
  margin-right: 2.4rem;
  display: flex;
  align-items: center;
  background: black;
  position: relative;
`

const EditButton = styled.img`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

const Title = styled.div`
  font-style: italic;
  font-size: 14px;
  color: #c4c4c4;
`

const StyledButtonText = styled(ButtonText)`
  margin-left: auto;
`

export default GalleryAttachment
