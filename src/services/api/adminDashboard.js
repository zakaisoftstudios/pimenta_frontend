import api, { auth } from '../../setup/api'

const resource = api('/admin/dashboard')

export const get = async () =>
  auth(resource)
    .get()
    .json()
