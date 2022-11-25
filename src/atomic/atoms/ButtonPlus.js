import React from 'react'
import styled from 'styled-components'

const ButtonPlus = ({
  handleClick
}) => (
  <Wrapper
    variant="contained"
    color="primary"
    type="button"
    onClick={handleClick}
  >
    +
  </Wrapper>
)

const Wrapper = styled.button`
  font-size: 20px;
  border: ${({ ghost }) =>
    ghost ? '2px solid rgba(1, 197, 229, 0.846178)' : '2px solid transparent'};
  color: ${({ ghost }) => (ghost ? '#01C0EA' : '#FFFFFF')};
  text-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
  border-radius: 100px;
  padding: 1rem 1rem;
  width: 5rem;
  height: 4.5rem;
  border-radius: 5rem;
  border-width: 0;
  background: ${({ ghost }) =>
    ghost
      ? '#FFFF'
      : 'linear-gradient(180deg,#01c0ea 0%,rgba(1, 197, 229, 0.846178) 100%)'};

  &:hover {
    outline: 0;
    background: linear-gradient(
      rgb(14, 208, 251) 0%,
      rgba(104, 234, 255, 0.847) 100%
    );
    border: '2px linear-gradient(180deg,#01c0ea 0%,rgba(1, 197, 229, 0.846178) 100%)';
    color: ${({ ghost }) => (ghost ? '#FFFF' : '')};
  }

  &:focus {
    outline: 0;
  }

  @media (max-width: 1173px) {
    width: 6rem;
    margin-left: -5px;
  }

  @media (max-width: 575px) {
    width: 5rem;
  }
`

export default ButtonPlus
