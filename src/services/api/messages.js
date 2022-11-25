import api, { auth } from '../../setup/api'

const resource = api(`/conversations`)

export const getAll = async (conversation_id, from) =>
  auth(resource)
    .url(`/${conversation_id}`)
    .url('/conversation_messages')
    .get()
    .json()

export const post = async (conversation_id, content, from) =>
  auth(resource)
    .url(`/${conversation_id}`)
    .url('/conversation_messages')
    .errorType('json')
    .post({
      conversation_message: {
        content
      }
    })
    .error(400, error => error.json)
    .json()
