import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'

export default ({ className, children }) => (
  <Wrapper className={className}>{children}</Wrapper>
)

const Wrapper = styled.div`
  min-height: 100%;
`
