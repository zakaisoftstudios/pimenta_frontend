import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Link = ({ children, className, href, ...rest }) => (
  <Wrapper href={href} className={className} {...rest}>
    {children}
  </Wrapper>
)

const Wrapper = styled.a`
  color: #01c0ea;
  text-decoration-line: underline;
  cursor: pointer;
  font-weight: 300;
  transition: color 0.2s;

  &:link,
  &:visited {
    color: #01c0ea;
  }

  &:hover,
  &:active {
    color: #4bdae7;
  }
`

export default Link
