import api, { auth } from '../../setup/api'

const resource = api('/student/hunted_by')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()
