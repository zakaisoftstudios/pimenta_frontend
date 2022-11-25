import api, { auth } from '../../setup/api'

const resource = api('/company/profile')

export const get = async () =>
  auth(resource)
    .get()
    .json()

export const patch = async companyProfile =>
  auth(resource)
    .errorType('json')
    .patch({
      profile: {
        ...companyProfile
      }
    })
    .error(400, error => error.json)
    .json()
