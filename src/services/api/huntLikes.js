import api, { auth } from '../../setup/api'

const resource = api('/student/hunt_likes')

export const post = async hunt_id =>
  auth(resource)
    .errorType('json')
    .post({
      hunt_id
    })
    .error(400, error => error.json)
    .json()

export const destroy = async hunt_id =>
  auth(resource)
    .query({ hunt_id })
    .delete()
    .json()
