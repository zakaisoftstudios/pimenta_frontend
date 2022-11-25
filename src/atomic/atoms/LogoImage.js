import React from 'react'
import styled from 'styled-components'
import logoImg from '../../assets/app_logo.png'

export default () => <Wrapper src={logoImg} alt="Logo image" />

const Wrapper = styled.img`
  width: 10rem;
  height: auto;
`
