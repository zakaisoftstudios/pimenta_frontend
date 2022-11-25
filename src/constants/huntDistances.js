import i18n from '../locales'
import { t } from '@lingui/macro'

export default () => {
  const distances = [5, 10, 20, 30, 50, 100, 150, 200, 400, 600, 1000].map(
    distance => ({
      label: `${distance} km`,
      value: distance
    })
  )

  return [{ label: i18n._(t`Any`), value: '' }, ...distances]
}
