import i18n from '../locales'
import { t } from '@lingui/macro'

const typesOfDegree = [
  {
    label: i18n._(t`Certificate`),
    value: 'certificate'
  },
  { label: i18n._(t`Re-education`), value: 're_education' },
  { label: i18n._(t`Business Economist`), value: 'business_economist' },
  { label: i18n._(t`Apprenticeship`), value: 'apprenticeship' },
  {
    label: i18n._(t`Bachelor of Science (BSc)`),
    value: 'bachelor_of_science'
  },
  { label: i18n._(t`Bachelor of Arts (BA)`), value: 'bachelor_of_arts' },
  { label: i18n._(t`Master of Science (MSc)`), value: 'master_of_science' },
  { label: i18n._(t`Master of Arts (MA)`), value: 'master_of_arts' },
  { label: i18n._(t`PDEng`), value: 'pdeng' },
  {
    label: i18n._(t`PhD`),
    value: 'phd'
  },
  {
    label: i18n._(t`Bachelor of Laws (LLB)`),
    value: 'bachelor_of_laws'
  },
  { label: i18n._(t`Master of Laws (LLM)`), value: 'master_of_laws' },
  { label: i18n._(t`Seminar`), value: 'seminar' },
  { label: i18n._(t`Dual Study`), value: 'dual_study' }
]

export default typesOfDegree

export const getTypeOfDegreeLabel = value => {
  const degree = typesOfDegree.find(item => item.value === value)
  return degree && degree.label
}
