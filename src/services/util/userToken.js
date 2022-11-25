import sessionStorageItems from '../../constants/sessionStorageItems'

export const getUserToken = () =>
  sessionStorage.getItem(sessionStorageItems.userToken)
