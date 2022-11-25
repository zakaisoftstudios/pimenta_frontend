import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '../atoms/Input'
import keyIcon from '../../assets/icons/key.svg'
import ButtonBig from '../atoms/ButtonBig'
import LogoBig from '../atoms/LogoBig'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import colors from '../../constants/colors'
import FormField from './FormField'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const PasswordResetForm = ({ handleGoToLogin, handleSubmit, i18n }) => (
  <FullBox>
    <Column noMargin fullWidth>
      <Form>
        <LogoWrapper />
        <Intro>
          <Trans>Password reset</Trans>
        </Intro>

        <form onSubmit={handleSubmit}>
          <FormField
            component={Input}
            name="password"
            type="password"
            placeholder={i18n._(t`password`)}
            icon={keyIcon}
            special
            flowLogin
          />

          <FormField
            component={Input}
            name="password_confirmation"
            type="password"
            placeholder={i18n._(t`confirm password`)}
            icon={keyIcon}
            special
            flowLogin
          />

          <ButtonsWrapper>
            <ButtonBig type="submit">
              <Trans>Change Password</Trans>
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

PasswordResetForm.propTypes = {
  handleForgotPassword: PropTypes.func.isRequired,
  handleGoToLogin: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired
}

export default withI18n()(PasswordResetForm)
