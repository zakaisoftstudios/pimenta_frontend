import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { date } from '../../services/locale'
import colors from '../../constants/colors'
import { labelFor } from '../../constants/educationalLevels'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const StudentProfileEducationEntry = ({ education, i18n }) => (
  <Wrapper>
    <div>{education.educational_level.label}</div>

    <div>
      {i18n._(t`${date(education.from)}`)} -{' '}
      {education.to ? i18n._(t`${date(education.to)}`) : <Trans>ongoing</Trans>}
    </div>

    <div>{education.school_name}</div>

    <div>
      {education.city}, {education.country}
    </div>

    <div>
      <Trans>Average Grade: {education.grade_point_average}</Trans>
    </div>

    {education.area_of_graduation && (
      <div>
        <Trans>Area of graduation: {education.area_of_graduation}</Trans>
      </div>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  flex-direction: column;
`

StudentProfileEducationEntry.propTypes = {
  education: PropTypes.object.isRequired
}

export default withI18n()(StudentProfileEducationEntry)
