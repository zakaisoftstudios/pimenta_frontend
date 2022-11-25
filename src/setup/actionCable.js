import { getUserToken } from '../services/util/userToken'

export const actionCableUrl = () =>
  `${process.env.REACT_APP_WS_URL}?token=${getUserToken()}`
