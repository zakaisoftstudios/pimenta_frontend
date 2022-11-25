import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import excludeIcon from '../../assets/exclude.svg'
import ButtonBig from '../atoms/ButtonBig'
import LogoBig from '../atoms/LogoBig'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import colors from '../../constants/colors'
import { Trans } from '@lingui/macro'

const PasswordResetForm = ({ handleSendEmail, email, componentClicked }) => (
  <FullBox>
    <Column noMargin fullWidth>
      <Form>
        <LogoWrapper />
        <ImageWrapper>
          <ImageIcon src={excludeIcon} alt="Icon Success" />
        </ImageWrapper>

        <ParagraphText>
          <Trans>Done!</Trans>
        </ParagraphText>
        <ParagraphText>
          <Trans>Now we just need you to confirm the e-mail we sent to</Trans>
        </ParagraphText>
        <HighlightText>{email}</HighlightText>

        {/*
            <ButtonsWrapper>
              <ButtonSendEmail handleClick={handleSendEmail}>Send email again</ButtonSendEmail>
            </ButtonsWrapper>
           */}
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

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 6.5rem;
  margin-bottom: 5.5rem;
  justify-content: center;
`

const ParagraphText = styled.p`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  font-size: 2.5rem;
  color: ${colors.white}
  text-align: center;
`

const HighlightText = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${colors.white}
  text-align: center;
`

const ImageIcon = styled.img`
  margin: 0 auto;
`

const ButtonsWrapper = styled.div`
  margin-bottom: 5rem;
  text-align: center;
`

const ButtonSendEmail = styled(ButtonBig)`
  font-size: 1.4rem;
  color: ${colors.white}
  text-decoration: underline;
  background: transparent;

  &:hover {
    color: ${colors.white}
    text-decoration: underline;
    background: transparent;
    box-shadow: none;
  }
`

PasswordResetForm.propTypes = {
  handleSendEmail: PropTypes.func.isRequired
}

export default PasswordResetForm
