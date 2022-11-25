import api, { auth } from '../../setup/api'

const resource = api('/student/likes')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()

export const post = async job_offer_id =>
  auth(resource)
    .errorType('json')
    .post({
      like: {
        job_offer_id
      }
    })
    .error(400, error => error.json)
    .json()

export const destroy = async likeId =>
  auth(resource)
    .url(`/${likeId}`)
    .delete()
    .res()
