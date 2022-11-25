import React from 'react'
import styled from 'styled-components'
import Container from '../atoms/Container'
import LogoImage from '../atoms/LogoImage'
import HeaderMenuContainer from '../../containers/HeaderMenu'
import HeaderProfile from './HeaderProfile'
import Pace from 'react-pace-progress'
import { breakpoints } from '../../constants/responsive'

const Header = ({ showPace }) => (
  <Wrapper>
    {showPace && (
      <PaceWrapper>
        <Pace color="#FFFF" height={2} />
      </PaceWrapper>
    )}

    <Background>
      <Container>
        <Items>
          <LogoImage />
          <HeaderMenuContainer />
          <HeaderProfile />
        </Items>
      </Container>
    </Background>
  </Wrapper>
)

const Wrapper = styled.header`
  display: none;
  background-color: #ffff;
  height: 6.2rem;

  position: sticky;
  top: 0;
  z-index: 1299;
  position: -webkit-sticky;
  
  @media (min-width: ${breakpoints.sm}) {
    display: flex;
  }

`

const Background = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  background: linear-gradient(
    179.65deg,
    #8c8c8c 6.25%,
    rgba(100, 100, 100, 0.846178) 21.97%,
    rgba(0, 0, 0, 0.71) 99.41%
  );
`

const Items = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const PaceWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`

export default Header
