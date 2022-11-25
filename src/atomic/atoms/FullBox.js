import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'

export default ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  margin: auto;

  @media (min-width: ${breakpoints.xs}) {
    width: 90%;
  }

  @media (min-width: ${breakpoints.sm}) {
    width: 80%;
  }

  @media (min-width: ${breakpoints.md}) {
    width: 70%;
  }

  @media (min-width: ${breakpoints.lg}) {
    width: 50%;
  }

  @media (min-width: ${breakpoints.xl}) {
    width: 40%;
  }
`
