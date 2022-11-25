import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_AVATAR,
  SET_PROFILE_COMPLETE
} from '../actions/auth'

const initialState = {
  authenticated: false,
  userName: '',
  userEmail: '',
  profileType: '',
  profilePic: '',
  jobsCount: null,
  userId: null,
  token: null,
  profileComplete: false
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      if (error) return state

      return {
        ...state,
        authenticated: true,
        ...payload
      }

    case LOGOUT_SUCCESS:
      if (error) return state
      return {
        ...state,
        authenticated: false,
        userName: '',
        userEmail: '',
        profileType: '',
        profilePic: '',
        jobsCount: null,
        profileId: null,
        token: ''
      }

    case UPDATE_PROFILE_AVATAR:
      if (error) return state

      return {
        ...state,
        profilePic: payload || state.profilePic
      }

    case SET_PROFILE_COMPLETE:
      if (error) return state

      return {
        ...state,
        profileComplete: true
      }

    default:
      return state
  }
}
