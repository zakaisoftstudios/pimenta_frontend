import wretch from 'wretch'
import sessionStorageItems from '../constants/sessionStorageItems'
import { getUserLocale } from '../locales'

export default resourceUrl =>
  wretch()
    // .errorType('json')
    .url("http://localhost:3000/v1")
    .url(resourceUrl)
    .headers({ 'Accept-Language': getUserLocale() })

export const auth = api =>
  api.auth(`Bearer ${sessionStorage.getItem(sessionStorageItems.userToken)}`)
