import i18n from '../locales'
import { t } from '@lingui/macro'

const genders = [
  { label: i18n._(t`Male`), value: 'm' },
  { label: i18n._(t`Female`), value: 'f' },
  { label: i18n._(t`X`), value: 'x' }
]

const gendersForSearch = [{ label: i18n._(t`Any`), value: '' }, ...genders]

export { gendersForSearch }

export default genders
