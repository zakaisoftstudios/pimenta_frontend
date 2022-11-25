import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProfileMainInfo from '../molecules/ProfileMainInfo'
import { CompanyProfileMainDetails } from '../molecules/CompanyProfileMainDetails'
import ActionHeading from '../molecules/ActionHeading'
import editIcon from '../../assets/icons/edit.svg'
import TextInfo from '../molecules/TextInfo'
import { profileTypes } from '../../constants/profileTypes'
import CompanyProfileContactInfo from '../molecules/CompanyProfileContactInfo'
import DeleteAccount from '../molecules/DeleteAccount'
import Loader from '../atoms/Loader'
import { breakpoints } from '../../constants/responsive'
import {
  getCover,
  getAvatarPicture,
  getAbout,
  getForCarousel
} from '../../services/attachments'
import Carousel from '../molecules/Carousel'
import ReturnButton from '../molecules/ReturnButton'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import ScrollToTopOnMount from '../molecules/ScrollToTopOnMount'
import ProfileVideo from '../molecules/ProfileVideo'

const CompanyProfile = ({
  profile,
  ready,
  handleReturn,
  canEdit = true,
  i18n,
  forMobile = false
}) => {
  return ready ? (
    <Wrapper>
      <ScrollToTopOnMount />

      <ProfileMainInfo
        coverImage={getCover(profile.attachments).picture_url}
        profilePic={getAvatarPicture(profile.attachments)}
        name={profile.name}
        detailsComponent={
          <CompanyProfileMainDetails
            industrySector={profile.industry_sector}
            country={profile.country}
            numberOfEmployees={profile.number_of_employees}
            jobsCount={profile.jobs_count}
          />
        }
      />

      <ProfileDetails forMobile={forMobile}>
        <LeftColumn>
          {handleReturn && (
            <ReturnButton
              mainAction={{ text: i18n._(t`Return`), handler: handleReturn }}
            />
          )}

          {canEdit && (
            <ActionHeading
              title={i18n._(t`About us`)}
              actionName={i18n._(t`Edit`)}
              buttonIcon={editIcon}
              actionPath="/company/profile/edit"
            />
          )}

          {profileTypes.CompanyProfile.textInfos.map(
            ({ title, field, breakNewLines }) => (
              <TextInfo
                key={field}
                title={title}
                content={profile[field]}
                breakNewLines={breakNewLines}
              />
            )
          )}

          <CompanyProfileContactInfo
            country={profile.country}
            city={profile.city}
            postalCode={profile.postal_code}
            homePage={profile.home_page}
            facebookLink={profile.facebok_link}
            twitterLink={profile.twitter_link}
            youtubeLink={profile.youtube_link}
            instagramLink={profile.instagram_link}
            street={profile.street}
            contactEmail={profile.contact_email}
          />
        
          { canEdit && (
            <DeleteAccount
              i18n={i18n}
            />
          )}

        </LeftColumn>

        <RightColumn>
          {getAbout(profile.attachments).picture_url && (
            <AboutImage
              src={getAbout(profile.attachments).picture_url}
              alt="Banner image"
            />
          )}

          <ProfileVideo attachments={profile.attachments} />

          {getForCarousel(profile.attachments).length > 0 && (
            <Carousel items={getForCarousel(profile.attachments)} />
          )}
        </RightColumn>
      </ProfileDetails>
    </Wrapper>
  ) : (
    <Loader />
  )
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

const ProfileDetails = styled.div`
  background: #ffffff;
  flex: 1;
  flex-direction: column;
  display: flex;
  padding: ${({ forMobile }) => (forMobile ? '0' : '2.4rem')};
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  padding-left: 0;
  @media (min-width: ${breakpoints.sm}) {
    padding-left: 7.2rem;
  }
`

const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 2.4rem;
  @media (min-width: ${breakpoints.sm}) {
    width: 34.7rem;
    height: 34.7rem;
  }
`

CompanyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
}

export default withI18n()(CompanyProfile)
