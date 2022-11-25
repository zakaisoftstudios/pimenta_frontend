import i18n from '../locales'
import { t } from '@lingui/macro'

const wagePeriods = [
  { label: i18n._(t`Hour`), value: 'hourly' },
  { label: i18n._(t`Week`), value: 'weekly' },
  { label: i18n._(t`Month`), value: 'montly' },
  { label: i18n._(t`Year`), value: 'yearly' }
]

export default wagePeriods

export const wagePeriodByValue = value =>
  wagePeriods.find(wagePeriod => wagePeriod.value === value)

export const getWagePeriodLabel = value => {
  const item = wagePeriods.find(item => item.value === value)
  return item && item.label
}
