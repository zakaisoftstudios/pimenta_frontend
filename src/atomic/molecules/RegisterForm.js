import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LogoBig from '../atoms/LogoBig'
import ButtonBig from '../atoms/ButtonBig'
import personIcon from '../../assets/icons/person.svg'
import emailIcon from '../../assets/icons/email.svg'
import keyIcon from '../../assets/icons/key.svg'
import InputRadio from './InputRadio'
import BigOptionLabel from '../atoms/BigOptionLabel'
import FormField from './FormField'
import Input from '../atoms/Input'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import InputCheckbox from '../atoms/InputCheckbox'
import Link from '../atoms/Link'
import LearnMoreHere from '../atoms/LearnMoreHere'
import colors from '../../constants/colors'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { breakpoints } from '../../constants/responsive'
import ScrollToTopOnMount from './ScrollToTopOnMount'

const RegisterForm = ({
  handleSubmit,
  handleGoToLogin,
  acceptTerms,
  handleTermsChange,
  profileTypes,
  i18n
}) => (
  <FullBox>
    <ScrollToTopOnMount />

    <Column noMargin fullWidth>
      <Form>
        <LogoWrapper />
        <Intro>
          <Trans>Create an account</Trans>
          <LearnMoreHere />
        </Intro>

        <form onSubmit={handleSubmit}>
          <InputRadioWrapper>
            <FormField
              name="profileType"
              component={StyledInputRadio}
              labelText={i18n._(t`You are:`)}
              options={profileTypes}
              loginFlow
              labelComponent={inputRadioProps => (
                <BigOptionLabel {...inputRadioProps} />
              )}
            />
          </InputRadioWrapper>

          <FormField
            name="name"
            component={Input}
            placeholder={i18n._(t`name`)}
            icon={personIcon}
            special
          />

          <FormField
            name="email"
            component={Input}
            placeholder={i18n._(t`email`)}
            icon={emailIcon}
            special
          />

          <FormField
            name="password"
            component={Input}
            type="password"
            placeholder={i18n._(t`password`)}
            icon={keyIcon}
            special
          />

          <FormField
            name="passwordConfirmation"
            component={Input}
            type="password"
            placeholder={i18n._(t`confirm password`)}
            icon={keyIcon}
            special
          />

          <ButtonsWrapper>
            <ButtonBig type="submit" disabled={!acceptTerms}>
              <Trans>Register</Trans>
            </ButtonBig>
            <ButtonBig ghost handleClick={handleGoToLogin}>
              <Trans>Login</Trans>
            </ButtonBig>

            <InputCheckbox
              name="acceptTerms"
              value={true}
              checked={acceptTerms}
              handleChange={handleTermsChange}
            >
              <LinkTermsStyle
                href={`${process.env.PUBLIC_URL}/c2su-terms-and-conditions.pdf`}
                target="_blank"
              >
                <Trans>Terms and Conditions</Trans>
              </LinkTermsStyle>
              {' | '}
              <LinkTermsStyle
                href={`${
                  process.env.PUBLIC_URL
                }/c2su-terms-and-conditions-en.pdf`}
                target="_blank"
              >
                <Trans>EN version</Trans>
              </LinkTermsStyle>
              <TextTermsStyle>
                <Trans>I have read the terms of use and agree.</Trans>
              </TextTermsStyle>
            </InputCheckbox>
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

const Intro = styled.div`
  font-size: 2rem;
  color: #fff !important;
  margin-bottom: 3.5rem;
  width: 100%;
  text-align: center;
`

const InputRadioWrapper = styled.div`
  margin-bottom: 4.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledInputRadio = styled(InputRadio)`
  width: auto;
  margin-bottom: 0;

  > div:last-child {
    div {
      label {
        margin-right: 0;
      }
      &:first-child {
        label {
          border-radius: 100px 0 0 100px;
        }
      }
      &:nth-child(2) {
        label {
          border-radius: 0;
        }
      }
      &:last-child {
        label {
          border-radius: 0 100px 100px 0;
        }
      }
    }
  }
`

const LinkTermsStyle = styled(Link)`
  font-size: 1.4rem;
  font-weight: 600;

  &:link,
  &:visited {
    color: #ffff;
  }

  &:hover,
  &:active {
    color: #ffff;
  }
`

const TextTermsStyle = styled.div`
  display: block;
  margin-left: 2.8rem;
`

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleGoToLogin: PropTypes.func.isRequired,
  handleTermsChange: PropTypes.func.isRequired,
  acceptTerms: PropTypes.bool.isRequired
}

export default withI18n()(RegisterForm)
