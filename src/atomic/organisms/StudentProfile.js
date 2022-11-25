import React from 'react'
import styled from 'styled-components'
import ProfileMainInfo from '../molecules/ProfileMainInfo'
import { StudentProfileMainDetails } from '../molecules/StudentProfileMainDetails'
import ActionHeading from '../molecules/ActionHeading'
import StudentProfileDetails from '../molecules/StudentProfileDetails'
import DeleteAccount from '../molecules/DeleteAccount'
import Loader from '../atoms/Loader'
import { breakpoints } from '../../constants/responsive'
import {
  getCover,
  getAvatarPicture,
  getForCarousel
} from '../../services/attachments'
import Carousel from '../molecules/Carousel'
import StudentProfileQualities from '../molecules/StudentProfileQualities'
import StudentProfileCertificates from '../molecules/StudentProfileCertificates'
import StudentProfileEducational from '../molecules/StudentProfileEducational'
import StudentProfileProfessional from '../molecules/StudentProfileProfessional'
import TextInfo from '../molecules/TextInfo'
import Heading from '../atoms/Heading'
import ReturnButton from '../molecules/ReturnButton'
import editIcon from '../../assets/icons/edit.svg'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'
import ScrollToTopOnMount from '../molecules/ScrollToTopOnMount'
import ProfileVideo from '../molecules/ProfileVideo'

const StudentProfile = ({
  profile: {
    name,
    country,
    city,
    graduation,
    attachments = [],
    grade_point_average,
    date_of_birth,
    mobility,
    driving_license,
    other_skills_and_interests,
    certificates,
    education_entries,
    work_experiences,
    student_profile_interests: interests,
    student_profile_skills: skills,
    student_profile_strengths: strengths,
    current_job_status,
    highest_graduation_level,
    area_of_graduation
  },
  handleReturn,
  i18n
}) => {
  const cover = getCover(attachments)

  return (
    <Wrapper>
      <ScrollToTopOnMount />

      <ProfileMainInfo
        coverImage={cover && cover.picture_url}
        profilePic={getAvatarPicture(attachments)}
        name={name}
        detailsComponent={
          <StudentProfileMainDetails
            graduation={graduation}
            city={city}
            country={country}
          />
        }
      />

      <ProfileDetails>
        <LeftColumn>
          {handleReturn && (
            <ReturnButton
              mainAction={{ text: i18n._(t`Return`), handler: handleReturn }}
            />
          )}

          <ActionHeading
            title={i18n._(t`About me`)}
            actionName={i18n._(t`Edit`)}
            buttonIcon={editIcon}
            actionPath="/student/profile/edit"
          />

          <StudentProfileDetails
            country={country}
            city={city}
            gradePointAverage={grade_point_average}
            dateOfBirth={date_of_birth}
            mobility={mobility}
            drivingLicense={driving_license}
            currentJobStatus={current_job_status}
            highestGraduationLevel={highest_graduation_level}
            areaOfGraduation={area_of_graduation}
          />

          <StudentProfileQualities
            skills={skills}
            interests={interests}
            strengths={strengths}
          />

          {other_skills_and_interests && (
            <TextInfo
              title={i18n._(t`More`)}
              content={other_skills_and_interests}
            />
          )}

          <Heading>
            <Trans>Experiences</Trans>
          </Heading>
          <StudentProfileCertificates certificates={certificates} />
          <StudentProfileEducational educationEntries={education_entries} />
          <StudentProfileProfessional workExperiences={work_experiences} />

          <DeleteAccount
            i18n={i18n}
          />
        </LeftColumn>

        <RightColumn>
          <ProfileVideo attachments={attachments} />

          {getForCarousel(attachments).length > 0 && (
            <Carousel items={getForCarousel(attachments)} />
          )}
        </RightColumn>
      </ProfileDetails>
    </Wrapper>
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
  padding: 2.4rem;
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
  @media (min-width: ${breakpoints.sm}) {
    padding-left: 7.2rem;
  }
`

export default withI18n()(StudentProfile)
