import api, { auth } from '../../setup/api'

export const getAll = async from => {
  const resource = api(`/${from}/conversations`)

  return auth(resource)
    .get()
    .json()
}

export const destroy = async (id, from) => {
  const resource = api(`/${from}/conversations`)

  auth(resource)
    .url(`/${id}`)
    .delete()
    .res()
}
