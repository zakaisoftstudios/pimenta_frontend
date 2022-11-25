import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../atoms/Input'
import emailIcon from '../../assets/icons/email.svg'
import ButtonBig from '../atoms/ButtonBig'
import LogoBig from '../atoms/LogoBig'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import colors from '../../constants/colors'
import { Trans } from '@lingui/macro'

const ForgotPasswordForm = ({
  handleForgotPassword,
  handleInputChange,
  handleGoToLogin,
  componentClicked,
  email
}) => (
  <FullBox>
    <Column noMargin fullWidth>
      <Form>
        <LogoWrapper />
        <Intro>
          <Trans>Forgot password</Trans>
        </Intro>

        <form onSubmit={handleForgotPassword}>
          <Input
            name="email"
            value={email}
            placeholder="e-mail"
            handleChange={handleInputChange}
            icon={emailIcon}
            special
            flowLogin
          />

          <ButtonsWrapper>
            <ButtonBig type="submit">
              <Trans>Forgot Password</Trans>
            </ButtonBig>
            <ButtonBig ghost handleClick={handleGoToLogin}>
              <Trans>Login</Trans>
            </ButtonBig>
          </ButtonsWrapper>
        </form>
      </Form>
    </Column>
  </FullBox>
)

const Form = styled.div`
  margin-top: 10rem;
`

const LogoWrapper = styled(LogoBig)`
  margin-bottom: 5rem;
`

const Intro = styled.div`
  font-size: 2rem;
  color: ${colors.white};
  margin-bottom: 3.5rem;
  width: 100%;
  text-align: center;
`

const ButtonsWrapper = styled.div`
  margin-bottom: 5rem;
`

ForgotPasswordForm.propTypes = {
  handleForgotPassword: PropTypes.func.isRequired,
  handleGoToLogin: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
}

export default ForgotPasswordForm
