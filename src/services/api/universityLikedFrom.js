import api, { auth } from '../../setup/api'

const resource = api('/university/liked_from')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()
