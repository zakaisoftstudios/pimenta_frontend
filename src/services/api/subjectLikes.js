import api, { auth } from '../../setup/api'

const resource = api('/subject_likes')

export const getAll = async () =>
  auth(resource)
    .get()
    .json()

export const post = async subject_offer_id =>
  auth(resource)
    .errorType('json')
    .post({
      subject_like: {
        subject_offer_id
      }
    })
    .error(400, error => error.json)
    .json()

export const destroy = async subjectOfferId =>
  auth(resource)
    .url(`/${subjectOfferId}`)
    .delete()
    .res()
