import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProfileMainInfo from '../molecules/ProfileMainInfo'
import UniversityProfileMainDetails from '../molecules/UniversityProfileMainDetails'
import ActionHeading from '../molecules/ActionHeading'
import editIcon from '../../assets/icons/edit.svg'
import TextInfo from '../molecules/TextInfo'
import { profileTypes } from '../../constants/profileTypes'
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
import UniversityProfileContactInfo from '../molecules/UniversityProfileContactInfo'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import ScrollToTopOnMount from '../molecules/ScrollToTopOnMount'
import ProfileVideo from '../molecules/ProfileVideo'
import * as actionToCall from '../../services/api/actionToCall'
import Button from '../atoms/Button'

const UniversityProfile = ({
  profile: {
    name,
    type_of_university,
    country,
    number_of_students,
    jobsCount,
    postal_code,
    city,
    home_page,
    facebok_link,
    twitter_link,
    youtube_link,
    street,
    attachments,
    contact_email,
    subject_offers_count,
    ...profileRest
  },
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
        coverImage={getCover(attachments).picture_url}
        profilePic={getAvatarPicture(attachments)}
        name={name}
        detailsComponent={
          <UniversityProfileMainDetails
            type={type_of_university}
            country={country}
            numberOfStudents={number_of_students}
            numberOfSubjects={subject_offers_count}
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
              title={i18n._(t`About`)}
              actionName={i18n._(t`Edit`)}
              buttonIcon={editIcon}
              actionPath="/university/profile/edit"
            />
          )}

          {profileTypes.UniversityProfile.textInfos.map(
            ({ title, field, breakNewLines }) => (
              <TextInfo
                key={field}
                title={title}
                content={profileRest[field]}
                breakNewLines={breakNewLines}
              />
            )
          )}

          <UniversityProfileContactInfo
            country={country}
            city={city}
            postalCode={postal_code}
            homePage={home_page}
            facebookLink={facebok_link}
            twitterLink={twitter_link}
            youtubeLink={youtube_link}
            street={street}
            contactEmail={contact_email}
          />

          {canEdit && (
            <DeleteAccount
              i18n={i18n}
            />
          )}


          {/* <Button handleClick={handlActionToCall}>
            Action
          </Button> */}
        </LeftColumn>

        <RightColumn>
          {getAbout(attachments).picture_url && (
            <AboutImage
              src={getAbout(attachments).picture_url}
              alt="Banner image"
            />
          )}

          <ProfileVideo attachments={attachments} />

          {getForCarousel(attachments).length > 0 && (
            <Carousel items={getForCarousel(attachments)} />
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

UniversityProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired
}

export default withI18n()(UniversityProfile)
