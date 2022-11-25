import React from 'react'
import styled from 'styled-components'

const FormRow = ({ children, className }) => (
  <Wrapper className={className}>{children}</Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.5rem;
  flex-shrink: 0;
`

export default FormRow
