import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LogoBig from '../atoms/LogoBig'
import ButtonBig from '../atoms/ButtonBig'
import personIcon from '../../assets/icons/person.svg'
import emailIcon from '../../assets/icons/email.svg'
import keyIcon from '../../assets/icons/key.svg'
import InputRadio from '../molecules/InputRadio'
import BigOptionLabel from '../atoms/BigOptionLabel'
import FormField from '../molecules/FormField'
import Input from '../atoms/Input'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import InputCheckbox from '../atoms/InputCheckbox'
import Link from '../atoms/Link'
import LearnMoreHere from '../atoms/LearnMoreHere'
import colors from '../../constants/colors'
import { profileTypesList } from '../../constants/profileTypes'
import FacebookLoginButton from '../atoms/FacebookLoginButton'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const FacebookSignup = ({
  handleSubmit,
  acceptTerms,
  handleTermsChange,
  handleCancel,
  i18n
}) => (
  <FullBox>
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
              options={profileTypesList()}
              loginFlow
              labelComponent={inputRadioProps => (
                <BigOptionLabel {...inputRadioProps} />
              )}
            />
          </InputRadioWrapper>

          <ButtonsWrapper>
            <FacebookLoginButton disabled={!acceptTerms} type="submit">
              <Trans>Start now with Facebook</Trans>
            </FacebookLoginButton>

            <ButtonBig ghost handleClick={handleCancel}>
              <Trans>Cancel</Trans>
            </ButtonBig>

            <InputCheckbox
              name="acceptTerms"
              value={true}
              checked={acceptTerms}
              handleChange={handleTermsChange}
            >
              <LinkTermsStyle>
                <Trans>Terms and Conditions</Trans>
              </LinkTermsStyle>
              <TextTermsStyle>
                <Trans>I have read the terms of use and agree.</Trans>
              </TextTermsStyle>
              <TextTermsStyle>revocation@pimentagroup.de</TextTermsStyle>
            </InputCheckbox>
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

const ButtonsWrapper = styled.div`
  margin-bottom: 5rem;
`

const Intro = styled.div`
  font-size: 2rem;
  color: #fff;
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
  color: ${colors.white};
`

const TextTermsStyle = styled.div`
  display: block;
  margin-left: 2.8rem;
`

export default withI18n()(FacebookSignup)
