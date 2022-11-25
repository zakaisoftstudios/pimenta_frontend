import React from 'react'
import styled from 'styled-components'
import loadingIndicator from '../../assets/loading.gif'

export default () => (
  <Wrapper>
    <StyledLoader />
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`

const StyledLoader = styled.div`
  height: 5rem;
  width: 5rem;
  background-image: ${`url(${loadingIndicator})`};
  background-repeat: no-repeat;
  background-position: center;
`
