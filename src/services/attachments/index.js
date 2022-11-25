import sessionStorageItems from '../../constants/sessionStorageItems'
import i18n from '../../locales'
import { t } from '@lingui/macro'

const types = {
  COVER: {
    width: 70,
    aspect: 360 / 133,
    type: 'cover',
    title: i18n._(t`Cover Image`)
  },
  AVATAR: {
    width: 70,
    aspect: 1 / 1,
    type: 'avatar',
    title: i18n._(t`Avatar Image`)
  },
  MAIN: {
    width: 70,
    aspect: 1 / 1,
    type: 'main',
    title: i18n._(t`Main Image`)
  },
  ABOUT: {
    aspect: 1 / 1,
    width: 70,
    type: 'about',
    title: i18n._(t`Banner Image`)
  },
  REGULAR: {
    width: 70,
    aspect: 16 / 9,
    type: 'regular',
    title: i18n._(t`Image`)
  },
  VIDEO: {
    type: 'video',
    title: i18n._(t`Video`)
  }
}

export const getTypeFromAttachment = attachment =>
  types[attachment.purpose.toUpperCase()]

export const getCover = attachments => getFromAttachments(attachments, 'cover')

export const getAbout = attachments => getFromAttachments(attachments, 'about')

export const getMain = attachments => getFromAttachments(attachments, 'main')

export const getRegular = attachments =>
  attachments.filter(attachment => attachment.purpose === 'regular')

export const getVideo = attachments => getFromAttachments(attachments, 'video')

export const getVideoUrl = attachments => {
  const video = getVideo(attachments)
  return video && video.video_url
}

export const getAvatar = attachments =>
  getFromAttachments(attachments, 'avatar')

export const getMainImage = attachments => {
  const mainImage = getFromAttachments(attachments, 'main');
  if (mainImage && mainImage.picture_url) return mainImage.picture_url;
  return getProfilePic(attachments);
}

export const getAvatarPicture = attachments => {
  const avatar = getAvatar(attachments)
  return avatar && avatar.picture_url
}

export const getForGallery = (attachments, type) => {
  const purposes = {
    student: ['regular', 'video'],
    company: ['regular', 'about', 'video'],
    jobOffer: ['regular', 'video', 'main'],
    subjectOffer: ['regular', 'video', 'main']
  }

  return attachments.filter(attachment =>
    purposes[type].includes(attachment.purpose)
  )
}

export const getForCarousel = attachments =>
  attachments
    .filter(
      attachment => attachment.purpose === 'regular' && attachment.picture_url
    )
    .map(attachment => attachment.picture_url)

const getFromAttachments = (attachments, type) =>
  attachments && attachments.find(({ purpose }) => purpose === type)

export const getProfilePic = attachments => {
  const regularPics = getRegular(attachments)
  const pic = regularPics.find(regularPic => regularPic.picture_url)
  return pic && pic.picture_url
}

export const usageTypes = Object.freeze({
  FOR_PROFILE: 'for_profile',
  FOR_JOB: 'for_job',
  FOR_SUBJECT: 'for_subject'
})

export const withInitialOrder = (attachments, usageType) => {
  switch (usageType) {
    case usageTypes['FOR_PROFILE']:
      return [
        getAbout(attachments),
        ...getRegular(attachments),
        getVideo(attachments),
        getCover(attachments),
        getAvatar(attachments)
      ]

    case usageTypes['FOR_JOB']:
      return [
        getMain(attachments),
        ...getRegular(attachments),
        getVideo(attachments)
      ]

    case usageTypes['FOR_SUBJECT']:
      return [
        getMain(attachments),
        ...getRegular(attachments),
        getVideo(attachments)
      ]

    default:
      return null
  }
}

export default types
