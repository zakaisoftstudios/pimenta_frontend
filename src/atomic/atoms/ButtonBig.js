import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import colors from '../../constants/colors';

const ButtonBig = ({ children, handleClick, ghost = false, disabled = false, className="" }) => (
  <Wrapper onClick={handleClick} ghost={ghost} disabled={disabled} className={className}>
    {children}
  </Wrapper>
)

const Wrapper = styled.button`
  width: 100%;
  height: 5rem;
  margin-bottom: 1.2rem;
  font-size: 2rem;

  color: ${({ ghost }) => (ghost ? colors.white : colors.hover)};
  border: ${({ ghost }) => (ghost ? `2px solid ${colors.white}` : '0')};
  background: ${({ ghost }) =>
    ghost
      ? 'rgba(255, 255, 255, 0.15)'
      : `linear-gradient(180deg, ${colors.linearGray} 0%, ${colors.white} 84.53%)`};
  box-shadow: none;
  cursor: pointer;
  border-radius: 100px;
  text-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;

  &[disabled] {
    opacity: 0.3;
    cursor: default;

    &:hover {
      background: ${({ ghost }) =>
        ghost
          ? 'rgba(255, 255, 255, 0.15)'
          : `linear-gradient(180deg, ${colors.linearGray} 0%, ${colors.white} 84.53%)`};
      box-shadow: none;
    }
  }

  &:hover {
    outline: 0;
    color: ${colors.hover};
    background: ${({ ghost }) => (
      ghost 
        ? colors.white 
        : `linear-gradient(180deg, ${colors.white} 0%, ${colors.linearGray} 84.53%)`)};
    transition: 0.8s all;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  &:focus {
    outline: 0;
  }
`

ButtonBig.propTypes = {
  handleClick: PropTypes.func,
  ghost: PropTypes.bool,
  disabled: PropTypes.bool
}

export default ButtonBig
