import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Plural } from '@lingui/macro'

export const CompanyProfileMainDetails = ({
  industrySector,
  country,
  numberOfEmployees,
  jobsCount
}) => (
  <Wrapper>
    {industrySector} - {country}
    <br />
    <Plural
      value={numberOfEmployees}
      one="# Employee"
      other="# Employees"
    /> - <Plural value={jobsCount} one="# job" other="# jobs" />
  </Wrapper>
)

CompanyProfileMainDetails.propTypes = {
  industrySector: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  numberOfEmployees: PropTypes.number.isRequired,
  jobsCount: PropTypes.number.isRequired
}

const Wrapper = styled.div`
  color: #646464;
  text-align: center;
  font-weight: 300;
`
