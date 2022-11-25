import React from 'react'
import styled from 'styled-components'

const Heading = ({ children, className }) => (
  <Wrapper className={className}>{children}</Wrapper>
)

const Wrapper = styled.div`
  font-size: 25px;
  color: #01c0ea;
  margin-bottom: 2.4rem;
`

export default Heading
