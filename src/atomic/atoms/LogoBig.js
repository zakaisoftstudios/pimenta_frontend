import React from 'react'
import styled from 'styled-components'
import logoImg from '../../assets/app_logo.png'
import { breakpoints } from '../../constants/responsive'

export default styled.div`
width: 100%;
  height: 11rem;
  background-image: ${`url(${logoImg})`};
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  margin-bottom: 8rem;
  

  @media screen and (min-width: ${breakpoints.md}) {
    height: 15rem;
  }
  
  @media screen and (min-width: ${breakpoints.lg}) {
    height: 18rem;
  }
`
