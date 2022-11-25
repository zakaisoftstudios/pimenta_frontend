import api, { auth } from '../../setup/api'

const resource = api('/company/hunting')

export const getAll = async (filters, page) => {
  return auth(resource)
    .url(`?page=${page}`)
    .query(filters)
    .get()
    .json()
}
