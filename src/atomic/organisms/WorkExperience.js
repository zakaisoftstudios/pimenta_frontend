import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { date } from '../../services/locale'
import colors from '../../constants/colors'
import * as WorkExperienceTypes from '../../constants/workExperienceTypes'
import { label } from '../../constants/workExperienceTypes'
import { Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { t } from '@lingui/macro'

const StudentProfileWorkExperience = ({ workExperience, i18n }) => (
  <Wrapper>
    <div>{workExperience.title}</div>

    <div>{workExperience.department}</div>

    <div>
      {i18n._(t`${date(workExperience.from)}`)} -{' '}
      {workExperience.to ? (
        i18n._(t`${date(workExperience.to)}`)
      ) : (
        <Trans>ongoing</Trans>
      )}
    </div>

    <div>
      <Trans>
        {label(workExperience.kind)} at {workExperience.company_name}
      </Trans>
    </div>

    <div>
      {workExperience.city}, {workExperience.country}
    </div>

    {workExperience.tasks && (
      <React.Fragment>
        <br />

        <p>{workExperience.tasks}</p>
      </React.Fragment>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
  color: ${colors.gray};
`

StudentProfileWorkExperience.propTypes = {
  workExperience: PropTypes.object.isRequired
}

export default withI18n()(StudentProfileWorkExperience)
