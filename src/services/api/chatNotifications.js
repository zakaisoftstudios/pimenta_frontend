import api, { auth } from '../../setup/api'

const resource = api('/chat_notifications')

export const destroy = async () => auth(resource).delete()
