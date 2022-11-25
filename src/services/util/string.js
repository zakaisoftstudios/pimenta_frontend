import i18n from '../../locales'
import { t } from '@lingui/macro'

export const afirmationFromBool = bool =>
  bool ? i18n._(t`Yes`) : i18n._(t`No`)

export const switchLast = (
  collection,
  currentIndex,
  showIfNotLast,
  showIfLast
) => (collection.length > currentIndex + 1 ? showIfNotLast : showIfLast)
