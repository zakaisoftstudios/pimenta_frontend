import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { breakpoints } from '../../constants/responsive'

const PrivateFullContainer = ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  padding-top: 0;

  @media (min-width: ${breakpoints.sm}) {
    background-color: #f5f5f5;
    padding-bottom: 30px;
    padding-top: 2rem;
    min-height: calc(100vh - 6.2rem);
  }

  @media (max-width: ${breakpoints.sm}) {
    height: calc(100vh - 5.5rem);
    overflow-y: scroll;
    overflow-x: hidden;
  }
`

PrivateFullContainer.propTypes = {
  withBackground: PropTypes.bool
}

export default PrivateFullContainer
