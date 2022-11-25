import i18n from '../locales'
import { t } from '@lingui/macro'

export default [
  { label: i18n._(t`Yes`), value: 'published' },
  { label: i18n._(t`No`), value: 'unpublished' }
]

export const jobOfferStates = {
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished'
}
