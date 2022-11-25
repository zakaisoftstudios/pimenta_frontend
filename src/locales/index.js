import localeCatalogDE from './de/messages'
import localeCatalogEN from './en/messages'
import { setupI18n } from '@lingui/core'
import { getUserLocales } from 'get-user-locale'

export const getUserLocale = () => {
  const DEFAULT_LOCALE = 'en'

  const availableLocales = [DEFAULT_LOCALE, 'de']
  const userLocales = getUserLocales()
  const userLocale = userLocales[0].substr(0, 2)
  
  return availableLocales.includes(userLocale) ? userLocale : DEFAULT_LOCALE
}

const catalogs = { de: localeCatalogDE, en: localeCatalogEN }
const i18n = setupI18n({ catalogs, language: getUserLocale() })

export default i18n
