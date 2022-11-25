import { APP_READY } from '../actions/initialLoad'

const initialState = {
  ready: false,
  userLocale: ''
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_READY:
      return {
        ...state,
        ready: true,
        userLocale: payload.userLocale
      }

    default:
      return state
  }
}
