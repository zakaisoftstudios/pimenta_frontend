import api, { auth } from '../../setup/api'

const resource = api('/company/liked_from')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()

export const destroy = async student_profile_id =>
  auth(resource)
    .url(`/${student_profile_id}`)
    .delete()
    .res()
