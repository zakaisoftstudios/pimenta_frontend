import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Heading from '../atoms/Heading'
import locationIcon from '../../assets/icons/location.svg'
import wwwIcon from '../../assets/icons/www.svg'
import facebookIcon from '../../assets/icons/facebook.svg'
import twitterIcon from '../../assets/icons/twitter.svg'
import youtubeIcon from '../../assets/icons/youtube.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import contactEmailIcon from '../../assets/icons/contact-email.svg'
import Link from '../atoms/Link'
import { Trans } from '@lingui/macro'

export const CompanyProfileContactInfo = ({
  postalCode,
  country,
  city,
  homePage,
  facebookLink,
  twitterLink,
  youtubeLink,
  instagramLink,
  street,
  contactEmail
}) => (
  <Wrapper>
    <Heading>
      <Trans>Be in touch</Trans>
    </Heading>

    <ContactItem>
      <LocationIcon alt="Location icon" src={locationIcon} />
      {street} <br />
      {`${postalCode} ${city}`} <br />
      {country}
    </ContactItem>

    {homePage && (
      <ContactItem>
        <WwwIcon alt="Website icon" src={wwwIcon} />
        <ContactLink href={homePage} target="_blank">
          {homePage}
        </ContactLink>
      </ContactItem>
    )}

    {contactEmail && (
      <ContactItem>
        <EmailIcon alt="Email icon" src={contactEmailIcon} />
        <ContactLink href={`mailto:${contactEmail}`}>
          {contactEmail}
        </ContactLink>
      </ContactItem>
    )}

    <SocialNetworks>
      {facebookLink && (
        <Link href={facebookLink} target="_blank">
          <FacebookIcon src={facebookIcon} />
        </Link>
      )}

      {twitterLink && (
        <Link href={twitterLink} target="_blank">
          <TwitterIcon src={twitterIcon} />
        </Link>
      )}

      {instagramLink && (
        <Link href={instagramLink} target="_blank">
          <InstagramIcon src={instagramIcon} />
        </Link>
      )}

      {youtubeLink && (
        <Link href={youtubeLink} target="_blank">
          <YoutubeIcon src={youtubeIcon} />
        </Link>
      )}
    </SocialNetworks>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LocationIcon = styled.img`
  width: 2rem;
  height: 2.7rem;
  margin-right: 2.1rem;
`

const WwwIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 2.1rem;
`

const EmailIcon = styled.img`
  width: 2.44rem;
  height: 1.7rem;
  margin-right: 2.1rem;
`

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  font-weight: 300;
`

const ContactLink = styled(Link)`
  align-self: center;
`

const Email = styled.div`
  align-self: center;
`

const SocialNetworks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.4rem;
`

const FacebookIcon = styled.img`
  width: 2rem;
  height: 3.4rem;
  margin-right: 2.4rem;
  transition: opacity 0.2s;

  &:hover,
  &:active {
    opacity: 0.7;
  }
`

const TwitterIcon = styled.img`
  width: 3.3rem;
  height: 2.7rem;
  margin-right: 2.4rem;

  transition: opacity 0.2s;

  &:hover,
  &:active {
    opacity: 0.7;
  }
`

const InstagramIcon = styled.img`
  width: 3.3rem;
  height: 2.7rem;
  margin-right: 2.4rem;
  color: blue;

  transition: opacity 0.2s;

  &:hover,
  &:active {
    opacity: 0.7;
  }
`

const YoutubeIcon = styled.img`
  width: 3.3rem;
  height: 2.3rem;

  transition: opacity 0.2s;

  &:hover,
  &:active {
    opacity: 0.7;
  }
`

CompanyProfileContactInfo.propTypes = {
  postalCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  homePage: PropTypes.string,
  facebookLink: PropTypes.string,
  twitterLink: PropTypes.string,
  youtubeLink: PropTypes.string
}

export default CompanyProfileContactInfo
