import { TOGGLE_MOBILE_MENU } from '../actions/mobileMenu'

const initialState = {
  visible: false
}

export default (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        visible: !state.visible
      }

    default:
      return initialState
  }
}
