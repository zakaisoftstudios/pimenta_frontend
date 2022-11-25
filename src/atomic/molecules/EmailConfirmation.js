import React from 'react'
import CenteredWrapper from '../atoms/CenteredWrapper'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import excludeIcon from '../../assets/exclude.svg'
import Loader from '../atoms/Loader'
import FullBox from '../atoms/FullBox'
import Column from '../atoms/Column'
import LogoBig from '../atoms/LogoBig'
import colors from '../../constants/colors'
import { Link } from 'react-router-dom'
import { Trans } from '@lingui/macro'

const EmailConfirmation = ({ confirmed }) => (
  <FullBox>
    {confirmed ? (
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
            <Trans>Registration confirmed!</Trans>
          </ParagraphText>

          <ButtonsWrapper>
            <LinkBack to="/login">
              <Trans>Login</Trans>
            </LinkBack>
          </ButtonsWrapper>
        </Form>
      </Column>
    ) : (
      <CenteredWrapper columns>
        <p>
          <Trans>We are confirming your registration...</Trans>
        </p>
        <Loader />
      </CenteredWrapper>
    )}
  </FullBox>
)

EmailConfirmation.propTypes = {
  confirmed: PropTypes.bool.isRequired,
  handleGoToLogin: PropTypes.func.isRequired
}

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
const ImageIcon = styled.img`
  margin: 0 auto;
`
const ButtonsWrapper = styled.div`
  margin-bottom: 5rem;
  text-align: center;
`

const LinkBack = styled(Link)`
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

const ParagraphText = styled.p`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  font-size: 2.5rem;
  color: ${colors.white}
  text-align: center;
`

export default EmailConfirmation
