export const SHOW_PACE = 'SHOW_PACE'
export const HIDE_PACE = 'HIDE_PACE'
export const SHOW_SNACK_NOTIFICATION = 'SHOW_SNACK_NOTIFICATION'
export const HIDE_SNACK_NOTIFICATION = 'HIDE_SNACK_NOTIFICATION'
export const UPDATE_CHAT_NOTIFICATIONS_COUNT = 'UPDATE_CHAT_NOTIFICATIONS_COUNT'

export const showPace = () => ({
  type: SHOW_PACE
})

export const hidePace = () => ({
  type: HIDE_PACE
})

export const showSnackNotification = payload => ({
  type: SHOW_SNACK_NOTIFICATION,
  payload
})

export const hideSnackNotification = () => ({
  type: HIDE_SNACK_NOTIFICATION
})

export const updateChatNotificationsCount = (payload, error) => ({
  type: UPDATE_CHAT_NOTIFICATIONS_COUNT,
  payload,
  error
})
