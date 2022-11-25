import i18n from '../locales'
import { t } from '@lingui/macro'

const jobOfferCategories = [
  { label: i18n._(t`Aprenticeship`), value: 'aprenticeship' },
  { label: i18n._(t`Trainee`), value: 'trainee' },
  { label: i18n._(t`Internship`), value: 'internship' },
  { label: i18n._(t`Job`), value: 'job' },
  { label: i18n._(t`Student Employee`), value: 'student_employee' },
  { label: i18n._(t`Int. Degree Program`), value: 'int_degree_program' },
]

export const forSelect = [
  { label: i18n._(t`All`), value: '' },
  ...jobOfferCategories
]

export const getCategoryLabel = category =>
  jobOfferCategories.find(item => item.value === category).label

export const getCategoryByValue = value =>
  jobOfferCategories.find(category => category.value === value)

export default jobOfferCategories
