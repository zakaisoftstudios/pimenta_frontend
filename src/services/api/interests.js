import api, { auth } from '../../setup/api'

const resource = api('/interests')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()
