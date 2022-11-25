import api, { auth } from '../../setup/api'

const resource = api('/skills')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()
