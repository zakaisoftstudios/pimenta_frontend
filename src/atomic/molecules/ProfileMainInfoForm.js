import React from 'react'
import styled from 'styled-components'
import profileImageTypes, {
  getCover,
  getAvatar
} from '../../services/attachments'
import ProfileMainInfo from '../molecules/ProfileMainInfo'

const ProfileMainInfoForm = ({ handleShowImageUploader, attachments }) => {
  const coverImageAttachment = getCover(attachments)
  const avatarImageAttachment = getAvatar(attachments)

  return (
    <StyledProfileMainInfo
      handleEditCover={handleShowImageUploader({
        imageType: profileImageTypes['COVER'],
        attachmentId: coverImageAttachment.id
      })}
      handleEditAvatar={handleShowImageUploader({
        imageType: profileImageTypes['AVATAR'],
        attachmentId: avatarImageAttachment.id
      })}
      coverImage={coverImageAttachment.picture_url}
      profilePic={avatarImageAttachment.picture_url}
      editing
    />
  )
}

const StyledProfileMainInfo = styled(ProfileMainInfo)`
  height: 22rem;
  padding-bottom: 0;
`

export default ProfileMainInfoForm
