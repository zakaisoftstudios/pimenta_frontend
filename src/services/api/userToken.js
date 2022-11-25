import api from '../../setup/api'

const resource = api('/user_token')

export const post = async (email, password) =>
  resource
    .errorType('json')
    .post({
      auth: {
        email,
        password
      }
    })
    .error(400, error => error.json)
    .json()
