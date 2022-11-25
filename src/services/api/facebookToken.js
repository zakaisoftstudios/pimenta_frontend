import api from '../../setup/api'

const resource = api('/facebook_user_tokens')

export const post = async (access_token, profile_type) =>
  resource
    .errorType('json')
    .post({
      auth: {
        access_token,
        profile_type
      }
    })
    .error(404, error => ({
      ...error.json,
      code: 404
    }))
    .error(400, error => error.json)
    .json()
