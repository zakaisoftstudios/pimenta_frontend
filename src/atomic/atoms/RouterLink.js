import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const RouterLink = ({ children, className, styled, ...rest }) =>
  styled ? (
    <StyledWrapper className={className} {...rest}>
      {children}
    </StyledWrapper>
  ) : (
    <Wrapper className={className} {...rest}>
      {children}
    </Wrapper>
  )

const Wrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const StyledWrapper = styled(Link)`
  color: #01c0ea;
  text-decoration-line: underline;
  cursor: pointer;
  font-weight: 300;

  &:link,
  &:visited {
    color: #01c0ea;
  }

  &:hover,
  &:active {
    color: #01c0ea;
  }
`

export default RouterLink
