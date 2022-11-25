import api, { auth } from '../../setup/api'

import { handleDateBeforeCreate } from '../util/handleDate'

const resource = api('/university/profile/subject_offers')

export const post = async subjectOffer =>
  auth(resource)
    .errorType('json')
    .post({
      subject_offer: {
        ...handleDateBeforeCreate(subjectOffer)
      }
    })
    .error(400, error => error.json)
    .json()

export const getAll = async (state, page) =>
  auth(resource)
    .url(`?state=${state}&page=${page}`)
    .get()
    .json()

export const get = async id =>
  auth(resource)
    .url(`/${id}`)
    .get()
    .json()

export const patch = async (id, subjectOffer) =>
  auth(resource)
    .url(`/${id}`)
    .errorType('json')
    .patch({
      subject_offer: {
        ...subjectOffer
      }
    })
    .error(400, error => error.json)
    .json()

export const destroy = async id =>
  auth(resource)
    .url(`/${id}`)
    .delete()
    .res()
