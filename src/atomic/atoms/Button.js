import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = ({ children, handleClick, icon = null, type }) => (
  <Wrapper onClick={handleClick} type={type}>
    {icon && <Icon src={icon} />}
    {children}
  </Wrapper>
)

const Wrapper = styled.button`
  font-size: 1.2rem;
  font-weight: 300;
  color: #01c0ea;
  text-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 78.94px;
  min-width: 5.5rem;
  height: 2.3rem;
  border: 0.7894px solid #01c0ea;
  padding: 0.5rem 1rem;
  background-color: white;
  transition: background 0.2s;

  &:hover {
    outline: 0;
    background: #01c0ea3b;
  }

  &:focus {
    outline: 0;
  }
`

const Icon = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 0.7rem;
`

Button.propTypes = {
  handleClick: PropTypes.func,
  icon: PropTypes.string
}

export default Button
