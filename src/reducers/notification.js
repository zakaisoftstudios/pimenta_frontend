import {
  SHOW_PACE,
  HIDE_PACE,
  UPDATE_CHAT_NOTIFICATIONS_COUNT,
  SHOW_SNACK_NOTIFICATION,
  HIDE_SNACK_NOTIFICATION
} from '../actions/notification'

const initialState = {
  showPace: false,
  snackNotificationVisible: false,
  snackNotificationMessage: '',
  chatNotificationsCount: 0
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SHOW_PACE:
      return {
        ...state,
        showPace: true
      }

    case HIDE_PACE:
      return {
        ...state,
        showPace: false
      }

    case UPDATE_CHAT_NOTIFICATIONS_COUNT:
      return {
        ...state,
        chatNotificationsCount: payload.count
      }

    case SHOW_SNACK_NOTIFICATION:
      return {
        ...state,
        snackNotificationVisible: true,
        snackNotificationMessage: payload.message
      }

    case HIDE_SNACK_NOTIFICATION:
      return {
        ...state,
        snackNotificationVisible: false,
        snackNotificationMessage: ''
      }

    default:
      return state
  }
}
