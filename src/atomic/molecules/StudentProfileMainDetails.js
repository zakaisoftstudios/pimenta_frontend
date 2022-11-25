import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const StudentProfileMainDetails = ({ graduation, city, country }) => (
  <Wrapper>
    {graduation}
    <br />
    {`${city}, ${country}`}{' '}
  </Wrapper>
)

StudentProfileMainDetails.propTypes = {
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
