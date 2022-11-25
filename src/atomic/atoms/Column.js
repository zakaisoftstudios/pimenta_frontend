import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'

const Column = ({ noMargin, fullWidth = false, children, className }) => (
  <Wrapper noMargin={noMargin} fullWidth={fullWidth} className={className}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => fullWidth && '100%'};
  flex: ${({ fullWidth }) => !fullWidth && 1};
  position: relative;
  margin-rigt: 0;
  @media (min-width: ${breakpoints.sm}) {
    margin-right: ${({ noMargin }) => !noMargin && '9rem'};
  }
`

export default Column
