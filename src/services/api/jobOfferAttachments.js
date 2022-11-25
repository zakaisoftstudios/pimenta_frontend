import api, { auth } from '../../setup/api'

export const patch = async ({ id, picture, video, purpose }, jobOfferId) => {
  const resource = api(
    `/company/profile/job_offers/${jobOfferId}/attachments/${id}`
  )

  auth(resource)
    .errorType('json')
    .patch({
      attachment: {
        video,
        picture,
        purpose
      }
    })
    .error(400, error => error.json)
    .json()
}

export const post = async ({ picture, video, purpose }, jobOfferId) => {
  const resource = api(`/company/profile/job_offers/${jobOfferId}/attachments`)

  auth(resource)
    .errorType('json')
    .post({
      video,
      picture,
      purpose
    })
    .error(400, error => error.json)
    .json()
}
