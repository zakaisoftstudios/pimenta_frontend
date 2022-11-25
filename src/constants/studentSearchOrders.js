import i18n from '../locales'
import { t } from '@lingui/macro'

export default [
  {
    value: 'match',
    label: i18n._(t`Match (highest)`)
  },
  {
    value: 'distance',
    label: i18n._(t`Distance (nearest)`)
  },
  {
    value: 'start_date',
    label: i18n._(t`Start Date (nearest)`)
  }
]
