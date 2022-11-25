import i18n from '../locales'
import { t } from '@lingui/macro'

const values = [
  { label: i18n._(t`Yes`), value: 'yes' },
  { label: i18n._(t`No`), value: 'no' },
  { label: i18n._(t`OPNV`), value: 'opnv' }
]

export const getMobilityLabel = value => {
  const found = values.find(item => item.value === value)
  return found && found.label
}

export default values
