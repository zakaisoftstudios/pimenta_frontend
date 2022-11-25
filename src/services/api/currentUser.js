import api, { auth } from '../../setup/api'

const resource = api('/current_user')

export const get = async () =>
  auth(resource)
    .get()
    .error(401, error => null)
    .json()
