import React from 'react'
import styled from 'styled-components'

const Tabs = ({ className, children }) => (
  <Wrapper className={className}>{children}</Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  margin-top: 4.8rem;
  margin-bottom: 3.4rem;
`

export default Tabs
