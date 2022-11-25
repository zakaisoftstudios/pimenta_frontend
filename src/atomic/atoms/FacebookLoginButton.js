import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

const FacebookLoginButton = ({
  handleClick,
  disabled,
  children,
  type = 'text'
}) => (
  <Wrapper onClick={handleClick} disabled={disabled} type={type}>
    {children}
  </Wrapper>
)

const Wrapper = styled.button`
  width: 100%;
  height: 5rem;
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 0;
  color: ${colors.buttonText};
  border: 0px;
  box-shadow: none;
  cursor: pointer;
  border-radius: 100px;
  text-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  text-transform: none;
  background: linear-gradient(
    ${colors.facebookPrimary} 0%,
    ${colors.facebookSecond} 84.53% 
  );
  font-family: Helvetica,sans-serif;
   
    -webkit-font-smoothing: antialiased;
   
    cursor: pointer;
    display: inline-block;
   
    text-decoration: none;
   
    transition: background-color .3s,border-color .3s;
   
   
    padding: calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px);
}

  &.metro {
    border-radius: 100px;
  }

  &:hover {
    outline: 0;
    color: ${colors.buttonText};
    border: 0px;
    background: linear-gradient(
      ${colors.facebookSecond} 0%,
      ${colors.facebookPrimary} 84.53%
    );
    transition: 0.8s all;
    box-shadow: 2px 2px 4px ${colors.shadowColor};
  }

  &:focus {
    outline: 0;
  }

  &[disabled] {
    opacity: 0.3;
    cursor: default;

    &:hover {
      color: ${colors.buttonText};
      background: linear-gradient(
        ${colors.facebookPrimary} 0%,
        ${colors.facebookSecond} 84.53%
      );
      box-shadow: none;
    }
  }
`

export default FacebookLoginButton
