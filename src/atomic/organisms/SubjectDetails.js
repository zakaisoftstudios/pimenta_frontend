import React from 'react'
import styled from 'styled-components'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import SubjectDetailsHeading from '../molecules/SubjectDetailsHeading'
import SubjectDetailsInfo from '../molecules/SubjectDetailsInfo'
import TextInfo from '../molecules/TextInfo'
import ReturnButton from '../molecules/ReturnButton'
import { getVideo, getForCarousel } from '../../services/attachments'
import Carousel from '../molecules/Carousel'
import VideoPlayer from '../molecules/VideoPlayer'
import QualitiesList from '../molecules/QualitiesList'
import { breakpoints } from '../../constants/responsive'
import { getDegreeLabel } from '../../constants/minimumDegrees'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import ScrollToTopOnMount from '../molecules/ScrollToTopOnMount'

const SubjectDetails = ({
  subjectOffer: {
    id,
    name,
    type_of_degree,
    content,
    perspectives,
    tests,
    postal_code,
    country,
    city,
    street,
    latitude,
    longitude,
    start_date,
    start_dates,
    duration_in_hours,
    cost_period,
    cost_amount,
    hours_of_classes_per_week,
    number_of_places,
    nummerus_clausus,
    minimum_degree,
    state,
    created_at,
    subject_offer_skills,
    subject_offer_interests,
    subject_offer_strengths,
    attachments,
    web_site_link,
    university_profile: { name: universityName }
  },
  handleReturn,
  canSeeApplicants = true,
  canEdit = true,
  handleShowUniversityProfile,
  i18n,
  className
}) => (
  <SectionBox className={className}>
    <ScrollToTopOnMount />

    <ReturnButton
      mainAction={{ text: i18n._(t`Return`), handler: handleReturn }}
    />

    {canSeeApplicants && (
      <Heading>
        <Trans>Subject Offers</Trans>
      </Heading>
    )}

    <SubjectDetailsHeading
      name={name}
      createdAt={created_at}
      numberOfPlaces={number_of_places}
      id={id}
      showEdit={canEdit}
    />

    <MoreInfo>
      <FirstColumn>
        <SubjectDetailsInfo
          universityName={universityName}
          typeOfDegree={type_of_degree}
          city={city}
          country={country}
          street={street}
          startDates={start_dates}
          durationInHours={duration_in_hours}
          costPeriod={cost_period}
          costAmount={cost_amount}
          hoursOfClassesPerWeek={hours_of_classes_per_week}
          nummerusClausus={nummerus_clausus}
          minimumDegree={minimum_degree}
          handleShowUniversityProfile={handleShowUniversityProfile}
          webSiteLink={web_site_link}
        />

        <QualitiesList
          type="skill"
          title={i18n._(t`Skills`)}
          qualities={subject_offer_skills}
        />

        <QualitiesList
          type="interest"
          title={i18n._(t`Interests`)}
          qualities={subject_offer_interests}
        />

        <QualitiesList
          type="strength"
          title={i18n._(t`Strenghts`)}
          qualities={subject_offer_strengths}
        />
      </FirstColumn>

      <TextInfoColumn>
        <TextInfo title={i18n._(t`Content`)} content={content} />

        <TextInfo title={i18n._(t`Perspectives`)} content={perspectives} />

        <TextInfo title={i18n._(t`Tests`)} content={tests} />
      </TextInfoColumn>

      <Column noMargin>
        {getVideo(attachments).video_url && (
          <Video>
            <VideoPlayer src={getVideo(attachments).video_url} />
          </Video>
        )}
        {getForCarousel(attachments).length > 0 && (
          <Carousel items={getForCarousel(attachments)} />
        )}
      </Column>
    </MoreInfo>
  </SectionBox>
)

const MoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${breakpoints.lg}) {
    flex-direction: row;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0;
  @media (min-width: ${breakpoints.lg}) {
    margin-right: ${({ noMargin }) => !noMargin && '4rem'};
  }
`

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0;
  @media (min-width: ${breakpoints.lg}) {
    width: 25rem;
    margin-right: ${({ noMargin }) => !noMargin && '9rem'};
  }
`

const TextInfoColumn = styled(Column)`
  flex: 1;
`

const AboutImage = styled.img`
  width: 34.7rem;
  height: 34.7rem;
  object-fit: cover;
  margin-bottom: 2.4rem;
`

const Video = styled.div`
  width: 100%;
  height: 19.5rem;
  align-items: center;
  background: black;
  margin-bottom: 3.4rem;

  @media (min-width: ${breakpoints.lg}) {
    width: 34.7rem;
  }
`

export default withI18n()(SubjectDetails)
