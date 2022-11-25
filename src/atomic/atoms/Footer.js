import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'
import { Trans } from '@lingui/macro'
import { breakpoints } from '../../constants/responsive'

const Footer = () => (
  <Wrapper>
    <ContentWrapper>
      <LinkWrapper>
        <Link href="/">
          <Trans>About this site</Trans>
        </Link>
        <Link href="/">
          <Trans>Terms & Conditions</Trans>
        </Link>
        <Link href="/">
          <Trans>Privacy Policy</Trans>
        </Link>
        <Link href="/">
          <Trans>Security</Trans>
        </Link>
        <Link href="/">
          <Trans>Language: English</Trans>
        </Link>
      </LinkWrapper>

      <Plaintext>
        <Trans>
          The contents were researched with great care. Nevertheless, C2SU
          accepts no liability for the accuracy, completeness and timeliness of
          the information provided. In particular, the information is also of a
          general nature and does not constitute legal advice in individual
          cases. For solving specific legal cases, in particular within the
          framework of the GDPR, you must consult a lawyer. Download European
          Data Protection Regulation as PDF
        </Trans>
      </Plaintext>
      <Plaintext>
        <Trans>© C2SU | All right reserved</Trans>
      </Plaintext>
    </ContentWrapper>
  </Wrapper>
)

const Wrapper = styled.footer`
  padding: 8px;
  background-color: ${colors.footerBackground};
  color: ${colors.footerColor};
`

const LinkWrapper = styled.nav`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 8px 0;
  text-align: center;
  flex-wrap: wrap;
`

const Link = styled.a`
  font-size: 1.2rem;
  line-height: 1.45455;
  margin: 8px;
  text-decoration: none;
  color: ${colors.footerColor};
  width: 100%;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${breakpoints.sm}) {
    width: auto;
  }
`

const Plaintext = styled.p`
  display: block;
  width: 80%;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.45455;
  font-weight: 300;
  text-align: center;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.2rem;
`

export default Footer
