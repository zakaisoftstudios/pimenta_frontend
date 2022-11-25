import api, { auth } from '../../setup/api'

const resource = api('/university/profile')

export const get = async () =>
  auth(resource)
    .get()
    .json()

export const patch = async universityProfile =>
  auth(resource)
    .errorType('json')
    .patch({
      profile: {
        ...universityProfile
      }
    })
    .error(400, error => error.json)
    .json()
