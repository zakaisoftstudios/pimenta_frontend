import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors';

const Label = ({ children, className, big = false }) => (
  <Wrapper className={className} big={big}>
    {children}
  </Wrapper>
)

const Wrapper = styled.label`
  font-style: italic;
  font-size: 14px;
  color: ${colors.labelColor};
  padding-left: 1.5rem;
  margin-bottom: 0.7rem;
`

export default Label
