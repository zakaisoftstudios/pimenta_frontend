import React from 'react'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import MatchMessageModal, {
  matchMessageTo
} from '../molecules/MatchMessageModal'
import { Trans } from '@lingui/macro'

const CompanyHunt = ({
  filterFormComponent,
  resultsComponent,
  reopen,
  showMatchMessage,
  handleCloseMatchMessageModal
}) => (
  <React.Fragment>
    {showMatchMessage && (
      <MatchMessageModal
        to={matchMessageTo.COMPANY}
        handleClose={handleCloseMatchMessageModal}
      />
    )}

    {reopen && filterFormComponent}
    {resultsComponent}
  </React.Fragment>
)

export default CompanyHunt
