import api, { auth } from '../../setup/api'

const resource = api('/attachments')

export const patch = async ({ id, picture, video, purpose }) => {
  auth(resource)
    .url(`/${id}`)
    .errorType('json')
    .patch({
      video,
      picture,
      purpose
    })
    .error(400, error => error.json)
    .json()
}

export const post = async ({ picture, video, purpose }) => {
  auth(resource)
    .errorType('json')
    .post({
      video,
      picture,
      purpose
    })
    .error(400, error => error.json)
    .json()
}
