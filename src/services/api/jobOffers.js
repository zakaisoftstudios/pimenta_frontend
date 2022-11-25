import api, { auth } from '../../setup/api'

import { handleDateBeforeCreate } from '../util/handleDate'

const resource = api('/company/profile/job_offers')

export const post = async jobOffer =>
    auth(resource)
      .errorType('json')
      .post({
        job_offer: {
          ...handleDateBeforeCreate(jobOffer)
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

export const patch = async (id, jobOffer) => {
  return(
    auth(resource)
    .url(`/${id}`)
    .errorType('json')
    .patch({
      job_offer: {
        ...jobOffer
      }
    })
    .error(400, error => error.json)
    .json()
  )
  }

export const destroy = async id =>
  auth(resource)
    .url(`/${id}`)
    .delete()
    .res()