import api, { auth } from '../../setup/api'

const resource = api('/strengths')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()
