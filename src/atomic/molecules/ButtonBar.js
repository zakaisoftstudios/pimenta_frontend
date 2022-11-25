import React from 'react'
import Divider from '../atoms/Divider'
import styled from 'styled-components'
import breakpoints from '../../constants/breakpoints'
import PropTypes from 'prop-types'

const ButtonBar = ({ children, mini }) => (
  <Wrapper>
    <Divider />

    <ButtonGroup mini={mini}>
      {React.Children.map(children, button => (
        <ButtonWrapper mini={mini}>{button}</ButtonWrapper>
      ))}
    </ButtonGroup>
  </Wrapper>
)

const Wrapper = styled.div``

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: ${({ mini }) => (mini ? 'nowrap' : 'wrap-reverse')};
  justify-content: flex-end;
  margin-top: ${({ mini }) => (mini ? '1rem' : '1.5rem')};
  margin-bottom: ${({ mini }) => (mini ? '1rem' : '1.5rem')};
  padding-left: 1rem;
`

const ButtonWrapper = styled.div`
  margin-right: 1rem;

  @media all and (max-width: ${breakpoints.small}) {
    width: ${({ mini }) => (mini ? 'auto' : '100%')};
    margin-right: ${({ mini }) => (mini ? '1rem' : '0')};
  }
`

ButtonBar.propTypes = {
  mini: PropTypes.bool
}

export default ButtonBar
