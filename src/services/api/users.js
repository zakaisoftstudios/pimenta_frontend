import api from '../../setup/api'

const resource = api('/users')

export const post = async ({
  name,
  email,
  password,
  passwordConfirmation,
  profileType
}) =>
  resource
    .errorType('json')
    .post({
      user: {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        profile_type: profileType
      }
    })
    .error(400, error => error.json)
    .json()
