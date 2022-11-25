import i18n from '../locales'
import { t } from '@lingui/macro'

export const all = [
  { value: 'mini_job', label: i18n._(t`Mini Job`) },
  {
    value: 'internship',
    label: i18n._(t`Internship`)
  },
  {
    value: 'aprrencticeship',
    label: i18n._(t`Aprrencticeship`)
  },
  {
    value: 'trainee',
    label: i18n._(t`Trainee`)
  },
  {
    value: 'full_time_job',
    label: i18n._(t`Full Time Job`)
  },
  {
    value: 'part_time_job',
    label: i18n._(t`Part Time Job`)
  }
]

export const label = value => all.find(item => item.value === value).label
