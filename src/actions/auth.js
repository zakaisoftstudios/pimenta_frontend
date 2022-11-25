import * as CurrentUserAPI from '../services/api/currentUser'
import { appReady } from './initialLoad'
import sessionStorageItems from '../constants/sessionStorageItems'
import { updateChatNotificationsCount } from './notification'
import { getAvatarPicture } from '../services/attachments'
import { getUserLocale } from '../locales'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const UPDATE_PROFILE_AVATAR = 'UPDATE_PROFILE_AVATAR'
export const SET_PROFILE_COMPLETE = 'SET_PROFILE_COMPLETE'

export const loginSuccess = (payload, error) => ({
  type: LOGIN_SUCCESS,
  payload,
  error
})

export const updateProfileAvatar = (payload, error) => ({
  type: UPDATE_PROFILE_AVATAR,
  payload,
  error
})

export const logoutSuccess = (payload, error) => ({
  type: LOGOUT_SUCCESS,
  payload,
  error
})

export const setProfileComplete = (payload, error) => ({
  type: SET_PROFILE_COMPLETE,
  payload,
  error
})

export const loadCurrentUser = () => async dispatch => {
  const currentUser = await CurrentUserAPI.get()
  const userLocale = getUserLocale()

  if (!currentUser) {
    dispatch(appReady({ userLocale }))
  } else {
    dispatch(
      loginSuccess({
        userName: currentUser.profile.name,
        userEmail: currentUser.email,
        profileType: currentUser.profile_type,
        profilePic: getAvatarPicture(currentUser.profile.attachments),
        jobsCount: currentUser.profile.jobs_count,
        userId: currentUser.id,
        token: currentUser.jwt,
        profileComplete: currentUser.profile.profile_complete
      })
    )

    dispatch(
      updateChatNotificationsCount({
        count: currentUser.chat_notifications_count
      })
    )
  }
}

export const logout = () => async dispatch => {
  sessionStorage.removeItem(sessionStorageItems.userToken)
  dispatch(logoutSuccess())
}
