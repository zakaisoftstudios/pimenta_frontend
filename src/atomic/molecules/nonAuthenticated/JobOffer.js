import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../atoms/Card'
import { getCategoryLabel } from '../../../constants/jobOfferCategories'
import { getWagePeriodLabel } from '../../../constants/wagePeriods'
import { date, money } from '../../../services/locale'
import ItalicText from '../../atoms/ItalicText'
import ProfilePic from '../../atoms/ProfilePic'
import { profilePicTypes } from '../../../constants/componentTypes'
import { getMainImage } from '../../../services/attachments'
import locationIcon from '../../../assets/icons/location.svg'
import wageIcon from '../../../assets/icons/wage.svg'
import { breakpoints } from '../../../constants/responsive'
import clockIcon from '../../../assets/icons/clock.svg'
import { limitStringLength } from '../../../services/util/limitStringLength'
import { breakWordBiggerThan } from '../../../services/util/breakWordBiggerThan'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

function JobOfferNonAuthenticated ({
  jobOffer: {
    content,
    category,
    city,
    country,
    wage,
    working_hours_per_week,
    created_at,
    attachments,
    company_profile: { name },
    wage_period,
  },
  handleClick,
  actions,
  i18n
}) {
  const[newContent, setNewContent] = useState(content)
  const[jobsLink, setJobsLink] = useState(`${getCategoryLabel(category)} • ${name}`)
  const[location, setLocation] = useState(`${city}, ${country}`)

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [])

  const resize = () => {
    setNewContent(breakWordBiggerThan(content, 12))
    setJobsLink(limitStringLength(jobsLink, 14))
    setLocation(limitStringLength(location, 12))
  }

  return (
    <StyledCard>
      <Content>
        <Info>
          <ProfileWrapper onClick={handleClick} clickable={handleClick}>
            <ProfilePic
              profilePic={getMainImage(attachments)}
              type={profilePicTypes.MEDIUM}
            />

            <ProfileInfo>
              <Name>{newContent}</Name>
              <Details>
                <JobsLink handleClick={handleClick}>
                  {jobsLink}
                </JobsLink>
              </Details>
            </ProfileInfo>
          </ProfileWrapper>

          <JobDetails>
            <JobDetailsItem>
              <LocationIcon src={locationIcon} alt="Location icon" />
              <Location>{`${location} \xa0`}</Location>
            </JobDetailsItem>

            <JobDetailsItem>
                <HoursContainer>
                  <LocationIcon src={clockIcon} alt="Clock icon" />
                  <div>
                    {working_hours_per_week ? (
                      <Trans>{working_hours_per_week}h per week</Trans>
                    ) : (
                      <Trans>not informed</Trans>
                    )}
                  </div>
                </HoursContainer>
            </JobDetailsItem>
            <JobDetailsItem>
                  <LocationIcon src={wageIcon} alt="Wage icon" />
                  <div>
                    {wage ? (
                      `${money(wage)} ${getWagePeriodLabel(wage_period)}`
                    ) : (
                      <Trans>not informed</Trans>
                    )}
                  </div>
            </JobDetailsItem>

            <PostedAt>
              <Trans>Posted at {i18n._(t`${date(created_at)}`)}</Trans>
            </PostedAt>
          </JobDetails>
        </Info>
      </Content>
    </StyledCard>
  )
}

const HoursContainer = styled.div`
  display: flex;
  margin-right: 25px;
`

const Content = styled.div`
  display: flex;
`
const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: calc(100% - 21px);
`

const StyledCard = styled(Card)`
${'' /* height: 22rem; */}
  display: flex;
  position: relative;
  flex-basis: 100%;
  width: 100%;
  flex-direction: column;
  @media (min-width: ${breakpoints.md}) {
    flex-basis: 46%;
    margin-right: 24px;
  }
  @media (min-width: ${breakpoints.lg}) {
    flex-basis: 31%;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  align-self: flex-start;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ big }) => (big ? 'flex-end' : 'center')};
  margin-left: 1.2rem;
`
const JobsLink = styled.div`
  color: #21c8ed;
`
const Name = styled.div`
  white-space: pre-line;
  font-weight: ${({ big }) => (big ? '500' : '300')};
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  color: #000000;
  margin-bottom: ${({ big }) => (big ? '0.6rem' : '0.2rem')};
`

const Details = styled.div`
  font-weight: 300;
  font-size: 14px;
`

const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const JobDetailsItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const LocationIcon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
  margin-left: 0.4rem;
`

const Location = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`

const PostedAt = styled(ItalicText)`
  margin-left: 0.4rem;
  color: #c4c4c4;
`

export default withI18n()(JobOfferNonAuthenticated)
