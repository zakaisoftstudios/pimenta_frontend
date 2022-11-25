import React from 'react'
import styled from 'styled-components'
import Card, { CardDropdown } from '../atoms/Card'
import StudentProfileHeading from './StudentProfileHeading'
import locationIcon from '../../assets/icons/location.svg'
import starIcon from '../../assets/icons/star.svg'
import clockIcon from '../../assets/icons/clock.svg'
import arrowDownIcon from '../../assets/icons/arrow-down.svg'
import arrowUpIcon from '../../assets/icons/arrow-up.svg'
import { breakpoints } from '../../constants/responsive'
import { getAvatarPicture } from '../../services/attachments'
import { distance } from '../../services/locale'
import { Trans } from '@lingui/macro'

const StudentCard = ({
  className,
  profile: {
    name,
    attachments,
    graduation,
    city,
    country,
    grade_point_average,
    age,
    student_likes,
    distance: studentDistance,
    id
  },
  handleShowStudentProfile,
  rejected,
  dropdown,
  actions
}) => (
  <StyledCard rejected={rejected} className={className}>
    <Content>
      <Info>
        <StudentProfileHeading
          name={name}
          picture={getAvatarPicture(attachments)}
          graduation={graduation}
          handleClick={handleShowStudentProfile}
        />

        <Details>
          <DetailsItem>
            <LocationIcon src={locationIcon} alt="Location icon" />
            <Location>{`${city}, ${country} \xa0`}</Location>
            {studentDistance && (
              <Distance>
                <Trans>{`• ${distance(studentDistance)} away`}</Trans>
              </Distance>
            )}
          </DetailsItem>

          <DetailsItem>
            <StarIcon src={starIcon} alt="Star icon" />
            <div>
              <Trans>{grade_point_average} average grade</Trans>
            </div>
          </DetailsItem>

          <DetailsItem>
            <ClockIcon src={clockIcon} alt="Clock icon" />
            <div>
              <Trans>{age} years old</Trans>
            </div>
          </DetailsItem>
        </Details>
      </Info>

      {actions}
    </Content>

    {dropdown}
  </StyledCard>
)

const StyledCard = styled(Card)`
  min-height: '18rem';
  flex-direction: column;
  align-self: flex-start;
  flex-basis: 100%;
  @media (min-width: ${breakpoints.md}) {
    flex-basis: 46%;
    margin-right: 24px;
  }
  @media (min-width: ${breakpoints.lg}) {
    flex-basis: 31%;
  }
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

const Details = styled.div`
  margin-top: 1.2rem;
`

const DetailsItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
  align-items: center;
`

const LocationIcon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
  margin-left: 0.4rem;
`

const StarIcon = styled.img`
  width: 1.9rem;
  height: 1.9rem;
  margin-right: 1.2rem;
`

const ClockIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1.3rem;
  margin-left: 0.2rem;
`

const Distance = styled.span`
  font-style: italic;
`

const Location = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`

export default StudentCard
