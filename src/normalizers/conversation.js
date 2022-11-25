import { normalize, schema } from 'normalizr'

export default conversations => {
  const partner = new schema.Entity('partners')
  const last_message = new schema.Entity('lastMessages')

  const conversation = new schema.Entity('conversations', {
    partner,
    last_message
  })

  return normalize(conversations, [conversation])
}
