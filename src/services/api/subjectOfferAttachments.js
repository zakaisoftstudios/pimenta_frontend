import api, { auth } from '../../setup/api'

export const patch = async (
  { id, picture, video, purpose },
  subjectOfferId
) => {
  const resource = api(
    `/university/profile/subject_offers/${subjectOfferId}/attachments/${id}`
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
