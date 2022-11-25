import { getMimeType } from '../util/base64'

export const validVideo = base64Data => getMimeType(base64Data) === 'video/mp4'
