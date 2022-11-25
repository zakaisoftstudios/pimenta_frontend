import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'
import { Trans } from '@lingui/macro'

const Logout = ({ handleLogout }) => (
  <Wrapper onClick={handleLogout}>
    <Trans>Logout</Trans>
  </Wrapper>
)

const Wrapper = styled.div`
  cursor: pointer;
  font-weight: bold;
  @media (min-width: ${breakpoints.sm}) {
    text-decoration: underline;
    color: #ffffff;
  }
`

Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

export default Logout
