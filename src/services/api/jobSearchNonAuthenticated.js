import api from '../../setup/api'

const resource = api('/non_authenticated/job_search')

export const getAll = async (filters, page) =>
  resource
    .url(`?page=${page}`)
    .query(filters)
    .get()
    .json()