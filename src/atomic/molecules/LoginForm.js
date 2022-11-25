import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../atoms/Input'
import emailIcon from '../../assets/icons/email.svg'
import keyIcon from '../../assets/icons/key.svg'
import ButtonBig from '../atoms/ButtonBig'
import LogoBig from '../atoms/LogoBig'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import { Link } from 'react-router-dom'
import colors from '../../constants/colors'
import InputCheckbox from '../atoms/InputCheckbox'
import FacebookLogin from 'react-facebook-login'
import facebook from '../../constants/facebook'
import { Trans } from '@lingui/macro'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const LoginForm = ({
  handleLogin,
  email,
  password,
  handleInputChange,
  handleGoToRegister,
  responseFacebook
}) => (
  <FullBox>
    <ScrollToTopOnMount />

    <Column noMargin fullWidth>
      <Form>
        <LogoWrapper />

        <form onSubmit={handleLogin}>
          <Input
            name="email"
            value={email}
            placeholder="e-mail"
            handleChange={handleInputChange}
            icon={emailIcon}
            special
            flowLogin
          />

          <Input
            name="password"
            value={password}
            placeholder="password"
            type="password"
            handleChange={handleInputChange}
            icon={keyIcon}
            special
            flowLogin
          />

          <ButtonsWrapper>
            <ButtonBig type="submit">
              <Trans>Login</Trans>
            </ButtonBig>
            <TextLine>or</TextLine>
            {/* <FacebookWrapper>
              <FacebookLogin
                appId={facebook.id}
                autoLoad={false}
                fields={facebook.fields}
                callback={responseFacebook}
              />
            </FacebookWrapper> */}
            <ButtonBig ghost handleClick={handleGoToRegister}>
              <Trans>Sign up for a new jobyneo account</Trans>
            </ButtonBig>

            <LinkForgotStyle to="/forgot-password">
              <Trans>Did you forget your password?</Trans>
            </LinkForgotStyle>
          </ButtonsWrapper>
        </form>
      </Form>
    </Column>
  </FullBox>
)

const Form = styled.div`
  margin-top: 8rem;
`

const LogoWrapper = styled(LogoBig)`
  margin-bottom: 8rem;
`

const ButtonsWrapper = styled.div`
  margin-bottom: 5rem;
`

const FacebookWrapper = styled.div`
  button {
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
  }
`

const LinkForgotStyle = styled(Link)`
  display: block;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.white};

  &:hover,
  &:active,
  &:link,
  &:visited {
    color: ${colors.white};
  }
`

const LinkTermsStyle = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${colors.white};

  &:hover,
  &:active,
  &:link,
  &:visited {
    color: ${colors.white};
  }
`

const TextTermsStyle = styled.div`
  display: block;
  margin-left: 2.8rem;
`

const TextLine = styled.div`
  color: ${colors.white};
  padding: 0 1rem 1rem 0;
  text-align: center;
  margin: 0 auto;
  font-size: 1.6rem;

  &:before,
  &:after {
    content: ' ';
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5rem;
    width: 5rem;
    height: 1px;
    background-color: ${colors.white};
  }
`

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleGoToRegister: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleTermsChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  acceptTerms: PropTypes.bool.isRequired
}

export default LoginForm
