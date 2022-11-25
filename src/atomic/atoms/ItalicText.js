import React from 'react'
import styled from 'styled-components'

const ItalicText = ({ children, className }) => (
  <Wrapper className={className}>{children}</Wrapper>
)

const Wrapper = styled.div`
  font-weight: 300;
  font-size: 12px;
  font-style: italic;
`

export default ItalicText
