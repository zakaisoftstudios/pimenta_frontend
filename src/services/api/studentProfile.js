import api, { auth } from '../../setup/api'

const resource = api('/student/profile')

export const get = async () =>
  auth(resource)
    .get()
    .json()

export const patch = async profile =>
  auth(resource)
    .errorType('json')
    .patch({
      profile
    })
    .error(400, error => error.json)
    .json()
