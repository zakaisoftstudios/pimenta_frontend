import i18n from '../locales'
import { t } from '@lingui/macro'

const subjectCostPeriods = [
  { label: i18n._(t`Hour`), value: 'hourly' },
  { label: i18n._(t`Week`), value: 'weekly' },
  { label: i18n._(t`Month`), value: 'montly' },
  { label: i18n._(t`Total`), value: 'total' }
]

export default subjectCostPeriods

export const subjectCostPeriodLabel = value => {
  const subjectCostPeriod = subjectCostPeriods.find(
    item => item.value === value
  )
  return subjectCostPeriod && subjectCostPeriod.label
}
