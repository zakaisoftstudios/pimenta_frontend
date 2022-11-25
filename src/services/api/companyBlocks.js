import api, { auth } from '../../setup/api'

const resource = api('/company/blocks')

export const post = async student_profile_id =>
  auth(resource)
    .errorType('json')
    .post({
      block: {
        student_profile_id
      }
    })
    .error(400, error => error.json)
    .json()
