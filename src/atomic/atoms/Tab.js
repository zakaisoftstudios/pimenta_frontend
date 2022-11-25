import React from 'react'
import styled from 'styled-components'

const Tab = ({ className, children, active, handleActivate }) => (
  <Wrapper className={className} onClick={handleActivate} active={active}>
    {children}
  </Wrapper>
)

const Wrapper = styled.div`
  font-size: 20px;
  border-bottom: ${({ active }) => (active ? '2px solid #01C0EA;' : 'none')};
  color: ${({ active }) => (active ? '' : '#c4c4c4')};
  padding-bottom: 0.3rem;
  margin-right: 2.4rem;
  cursor: pointer;
`

export default Tab
