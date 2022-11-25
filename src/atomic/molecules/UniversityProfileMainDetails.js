import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { typesOfUniversitiesLabel } from '../../constants/types_of_university'

const UniversityProfileMainDetails = ({
  type,
  country,
  numberOfStudents,
  numberOfSubjects,
  i18n
}) => (
  <Wrapper>
    {typesOfUniversitiesLabel(type)} - {country}
    <br />
    {numberOfStudents && `${numberOfStudents} ${i18n._(t`students`)} - `}{' '}
    {`${numberOfSubjects} ${i18n._(t`subjects`)}`}
  </Wrapper>
)

const Wrapper = styled.div`
  color: #646464;
  text-align: center;
  font-weight: 300;
`

export default withI18n()(UniversityProfileMainDetails)
