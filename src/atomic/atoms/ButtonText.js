import React from 'react'
import styled from 'styled-components'

const ButtonText = ({ children, className, handleClick }) => (
  <Wrapper className={className} onClick={handleClick}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  font-weight: bold;
  color: #01c0ea;
  cursor: pointer;
  text-transform: uppercase;
  padding: 1rem;
  border-radius: 4px;
  transition: background 0.2s;
  font-size: 0.9em;

  &:hover {
    background: #eeeeee;
  }
`

export default ButtonText
