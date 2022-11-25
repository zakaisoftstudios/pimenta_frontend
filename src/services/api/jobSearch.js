import api, { auth } from '../../setup/api'

const resource = api('/student/job_search')

export const getAll = async (filters, page) =>
  auth(resource)
    .url(`?page=${page}`)
    .query(filters)
    .get()
    .json()
