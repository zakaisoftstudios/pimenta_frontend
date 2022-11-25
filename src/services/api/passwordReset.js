import api from '../../setup/api'

const resource = api('/password_resets')

export const post = async email =>
  resource
    .errorType('json')
    .post({
      user: {
        email
      }
    })
    .error(400, error => error.json)
    .json()

export const patch = async (password, password_confirmation, token) =>
  resource
    .url(`/${token}`)
    .errorType('json')
    .patch({
      user: {
        password,
        password_confirmation
      }
    })
    .error(400, error => error.json)
    .json()
