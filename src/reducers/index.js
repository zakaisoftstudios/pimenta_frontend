import { combineReducers } from 'redux'
import auth from './auth'
import notification from './notification'
import mobileMenu from './mobileMenu'
import initialLoad from './initialLoad'
import filters from './filters'

export default combineReducers({
  auth,
  notification,
  mobileMenu,
  initialLoad,
  filters
})
