import api, { auth } from '../../setup/api'

const resource = api('/account')

export const destroy = async () =>
  auth(resource)
    .delete()
    .res()
