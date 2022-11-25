import api, { auth } from '../../setup/api'

const resource = api('/admin/company/profiles')

export const getAll = async (page) =>
auth(resource)
  .url(`?page=${page}`)
  .get()
  .json()

export const destroy = async (id) =>
  auth(resource)
    .url(`/${id}`)
    .delete()
    .res()
