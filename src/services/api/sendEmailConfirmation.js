import api from '../../setup/api'

const resource = api('/password-reset')

export const post = async (email) =>
  resource
    .errorType('json')
    .post({
      user: {
        email
      }
    })
    .error(400, error => error.json)
    .json()