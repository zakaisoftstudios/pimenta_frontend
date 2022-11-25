import api, { auth } from '../../setup/api'

const resource = api('/company/hunts')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()

export const post = async student_profile_id =>
  auth(resource)
    .errorType('json')
    .post({
      hunt: {
        student_profile_id
      }
    })
    .error(400, error => error.json)
    .json()

export const destroy = async huntId =>
  auth(resource)
    .url(`/${huntId}`)
    .delete()
    .res()
