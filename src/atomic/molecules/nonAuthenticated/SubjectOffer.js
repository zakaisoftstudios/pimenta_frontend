import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Card from '../../atoms/Card'
import { getTypeOfDegreeLabel } from '../../../constants/typesOfDegree'
import { getDegreeLabel } from '../../../constants/minimumDegrees'
import { subjectCostPeriodLabel } from '../../../constants/subjectCostPeriods'
import { date, money } from '../../../services/locale'
import ItalicText from '../../atoms/ItalicText'
import ProfilePic from '../../atoms/ProfilePic'
import { profilePicTypes } from '../../../constants/componentTypes'
import { getMainImage } from '../../../services/attachments'
import locationIcon from '../../../assets/icons/location.svg'
import wageIcon from '../../../assets/icons/wage.svg'
import { breakpoints } from '../../../constants/responsive'
import clockIcon from '../../../assets/icons/clock.svg'
import teacherHatIcon from '../../../assets/icons/teacher-hat.svg'
import OfferMatchPercentage from '../OfferMatchPercentage'
import { limitStringLength } from '../../../services/util/limitStringLength'
import { breakWordBiggerThan } from '../../../services/util/breakWordBiggerThan'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

function SubjectOfferNonAuthenticated({
  subjectOffer: {
    name,
    type_of_degree,
    city,
    country,
    start_date,
    start_dates,
    cost_amount,
    cost_period,
    minimum_degree,
    number_of_places,
    created_at,
    attachments,
    match_percentage,
    university_profile: { name: universityName },
    distance: subjectDistance
  },
  likeMatchPercentage,
  handleClick,
  actions,
  i18n
}) {
  const[newName, setNewName] = useState(name)
  const[subjectLink, setSubjectLink] = useState(`${getTypeOfDegreeLabel(type_of_degree)} • ${universityName}`)
  const[location, setLocation] = useState(`${city}, ${country} \xa0`)

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [])

  const resize = () => {
    setNewName(breakWordBiggerThan(name, 12))
    setSubjectLink(limitStringLength(subjectLink, 14))
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
              <Name>{newName}</Name>
              <Details>
                <SubjectLink handleClick={handleClick}>
                  {subjectLink}
                </SubjectLink>
              </Details>
            </ProfileInfo>
          </ProfileWrapper>

          <SubjectDetails>
            <SubjectDetailsItem>
              <Icon src={locationIcon} alt="Location icon" />
              <Location>{location}</Location>
            </SubjectDetailsItem>

            <WrapperStartDate>
              <SubjectDetailsItem>
                <Icon src={clockIcon} alt="Clock icon" />

                <ListStartDate>
                  {start_dates.map((startDate) =>
                    <ListChildStartDate>
                      {i18n._(t`${date(startDate)}`)}
                    </ListChildStartDate>
                  )}
                </ListStartDate>
                {number_of_places && (
                  <Trans> • {number_of_places} free places</Trans>
                )}
              </SubjectDetailsItem>
            </WrapperStartDate>

            <SubjectDetailsItem>
              <Icon src={wageIcon} alt="Wage icon" />
              <div>
                {cost_amount ? (
                  `${money(cost_amount)} ${subjectCostPeriodLabel(cost_period)}`
                ) : (
                  <Trans>not informed</Trans>
                )}
              </div>
            </SubjectDetailsItem>

            <SubjectDetailsItem>
              <Icon src={teacherHatIcon} alt="Teacher hat icon" />
              <div>{getDegreeLabel(minimum_degree)}</div>
            </SubjectDetailsItem>

            <PostedAt>
              <Trans>Posted at {i18n._(t`${date(created_at)}`)}</Trans>
            </PostedAt>
          </SubjectDetails>
        </Info>
      </Content>

      <OfferMatchPercentage>
        {likeMatchPercentage || match_percentage}
      </OfferMatchPercentage>
    </StyledCard>
  )
}

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
  flex-basis: 100%;
  flex-direction: column;
  position: relative;
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
const SubjectLink = styled.div`
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

const SubjectDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const SubjectDetailsItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
  align-items: center;
`

const Icon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
  margin-left: 0.4rem;
`

const PostedAt = styled(ItalicText)`
  margin-left: 0.4rem;
  color: #c4c4c4;
`

const Location = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`

const WrapperStartDate = styled.div`
  margin-top: -15px;
  margin-bottom: -15px;
`

const ListStartDate = styled.ul`
  margin-left: -28px;
  margin-right: 6px;
`

const ListChildStartDate = styled.li`
  list-style-type: circle;
`

export default withI18n()(SubjectOfferNonAuthenticated)
