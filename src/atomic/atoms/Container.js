import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'

const Container = ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  align-self: stretch;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints.xs}) {
    width: 100%;
  }

  @media (min-width: ${breakpoints.sm}) {
    width: ${breakpoints.sm};
  }

  @media (min-width: ${breakpoints.md}) {
    width: ${breakpoints.md};
  }

  @media (min-width: ${breakpoints.lg}) {
    width: ${breakpoints.lg};
  }

  @media (min-width: ${breakpoints.xl}) {
    width: ${breakpoints.lg};
  }
`

export default Container
