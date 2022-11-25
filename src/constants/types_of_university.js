import i18n from '../locales'
import { t } from '@lingui/macro'

const typesOfUniversities = [
  { label: i18n._(t`Public`), value: 'public' },
  { label: i18n._(t`Private`), value: 'private' }
]

export default typesOfUniversities

export const typesOfUniversitiesLabel = value => {
  const typeOfUniversity = typesOfUniversities.find(
    item => item.value === value
  )
  return typeOfUniversity && typeOfUniversity.label
}
