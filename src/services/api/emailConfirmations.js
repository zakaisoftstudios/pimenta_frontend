import api from '../../setup/api'

const resource = api('/email_confirmations')

export const post = async confirm_token =>
  resource
    .errorType('json')
    .post({
      email_confirmation: {
        confirm_token
      }
    })
    .error(400, error => error.json)
    .json()
