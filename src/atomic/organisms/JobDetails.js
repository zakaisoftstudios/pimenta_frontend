import React from 'react'
import styled from 'styled-components'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import JobDetailsHeading from '../molecules/JobDetailsHeading'
import JobDetailsInfo from '../molecules/JobDetailsInfo'
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

const JobDetails = ({
  jobOffer: {
    id,
    content,
    created_at,
    free_places,
    category,
    city,
    country,
    street,
    start,
    end_date,
    duration,
    wage,
    what_is_expected_from_us,
    what_is_expected_from_you,
    tasks,
    perspectives,
    minimum_degree,
    working_hours_per_week,
    job_offer_skills,
    job_offer_interests,
    job_offer_strengths,
    attachments,
    web_site_link,
    company_profile: { name: companyName },
    wage_period
  },
  handleReturn,
  canSeeApplicants = true,
  canEdit = true,
  handleShowCompanyProfile,
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
        <Trans>Job Offers</Trans>
      </Heading>
    )}

    <JobDetailsHeading
      content={content}
      createdAt={created_at}
      freePlaces={free_places}
      id={id}
      showEdit={canEdit}
    />

    <MoreInfo>
      <FirstColumn>
        <JobDetailsInfo
          companyName={companyName}
          category={category}
          city={city}
          country={country}
          start={start}
          endDate={end_date}
          duration={duration}
          wage={wage}
          wagePeriod={wage_period}
          workingHoursPerWeek={working_hours_per_week}
          minimumDegree={getDegreeLabel(minimum_degree)}
          street={street}
          webSiteLink={web_site_link}
          handleShowCompanyProfile={handleShowCompanyProfile}
        />

        <QualitiesList
          type="skill"
          title={i18n._(t`Skills`)}
          qualities={job_offer_skills}
        />

        <QualitiesList
          type="interest"
          title={i18n._(t`Interests`)}
          qualities={job_offer_interests}
        />

        <QualitiesList
          type="strength"
          title={i18n._(t`Strengths`)}
          qualities={job_offer_strengths}
        />
      </FirstColumn>

      <TextInfoColumn>
        <TextInfo
          title={i18n._(t`What is expected from us`)}
          content={what_is_expected_from_us}
        />

        <TextInfo
          title={i18n._(t`What is expected from you`)}
          content={what_is_expected_from_you}
        />

        <TextInfo title={i18n._(t`Tasks`)} content={tasks} />

        <TextInfo title={i18n._(t`Perspectives`)} content={perspectives} />
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
    margin-right: ${({ noMargin }) => !noMargin && '9rem'};
  }
`

const TextInfoColumn = styled(Column)`
  flex: 1;
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

export default withI18n()(JobDetails)
