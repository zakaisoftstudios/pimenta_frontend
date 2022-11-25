import api, { auth } from '../../setup/api'

const resource = api('/admin/profile')

export const get = async () =>
  auth(resource)
    .errorType('json')
    .get()
    .error(400, error => error.json)
    .json()
