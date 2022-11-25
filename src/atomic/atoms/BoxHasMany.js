import React from 'react'
import styled from 'styled-components'
import breakpoints from '../../constants/breakpoints'
import colors from '../../constants/colors'
import dimensions from '../../constants/dimensions'
import PropTypes from 'prop-types'

const BoxHasMany = ({ children, noMarginBottom = false }) => (
  <Wrapper noMarginBottom={noMarginBottom}>{children}</Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  width: 36.5rem;
  padding: 1rem;
  margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? '' : '3rem')};

  @media all and (max-width: ${breakpoints.small}) {
    width: ${dimensions.input.widthLong};
  }
`

BoxHasMany.propTypes = {
  noMarginBottom: PropTypes.bool
}

export default BoxHasMany
