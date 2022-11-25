import api, { auth } from '../../setup/api'

const resource = api('/action_to_call')

export const post = async () =>
  auth(resource)
    .errorType('json')
    .post({})
    .error(400, error => error.json)
    .json()
