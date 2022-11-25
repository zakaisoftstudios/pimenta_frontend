import api, { auth } from '../../setup/api'

const resource = api('/student/blocks')

export const post = async company_profile_id =>
  auth(resource)
    .errorType('json')
    .post({
      block: {
        company_profile_id
      }
    })
    .error(400, error => error.json)
    .json()
