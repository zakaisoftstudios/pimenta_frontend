import React from 'react'
import styled from 'styled-components'

const PublicFullContainer = ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  background: linear-gradient(
    166.17deg,
    #3C3C3C 6.25%,
    rgba(16, 16, 16, 0.846178) 21.97%,
    rgba(0, 0, 0, 0.71) 99.41%
  );
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
`

export default PublicFullContainer
