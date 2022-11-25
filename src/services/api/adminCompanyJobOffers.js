import api, { auth } from '../../setup/api'

const resource = api('/admin/company/job_offers')

export const destroy = async (id) =>
  auth(resource)
    .url(`/${id}`)
    .delete()
    .res()
