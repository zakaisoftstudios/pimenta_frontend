import { SET_LAST_FILTER } from '../actions/filters'

const initialState = {
  lastFilter: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LAST_FILTER:
      return {
        ...state,
        lastFilter: payload
      }
    default:
      return initialState
  }
}
