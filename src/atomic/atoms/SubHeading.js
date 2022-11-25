import React from 'react'
import styled from 'styled-components'

const SubHeading = ({ children, className, largeMarginBottom = null }) => (
  <Wrapper className={className} largeMarginBottom={largeMarginBottom}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  font-size: 20px;
  margin-bottom: ${({ largeMarginBottom }) =>
    largeMarginBottom ? '2.4rem' : '1.2rem'};
`

export default SubHeading
