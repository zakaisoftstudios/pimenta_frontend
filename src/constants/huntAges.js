import { t } from '@lingui/macro'
import i18n from '../locales'

export default () => {
  const ages = [...Array(51).keys()].map(age => ({
    label: age,
    value: age
  }))

  return [{ label: i18n._(t`Any`), value: '' }, ...ages].filter(
    age => age.value === '' || age.value >= 14
  )
}
