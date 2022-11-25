import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import buildingIcon from '../../assets/icons/building.svg'
import locationIcon from '../../assets/icons/location.svg'
import timeIcon from '../../assets/icons/time.svg'
import wageIcon from '../../assets/icons/wage.svg'
import clockIcon from '../../assets/icons/clock.svg'
import wwwIcon from '../../assets/icons/www.svg'
import teacherHatIcon from '../../assets/icons/teacher-hat.svg'
import Link from '../atoms/Link'
import { getCategoryLabel } from '../../constants/jobOfferCategories'
import { date, money } from '../../services/locale'
import { breakpoints } from '../../constants/responsive'
import { Trans } from '@lingui/macro'
import { getWagePeriodLabel } from '../../constants/wagePeriods'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { handleCorrectDate } from '../../services/util/handleDate'

const JobDetailsInfo = ({
  className,
  companyName,
  category,
  city,
  country,
  duration,
  start,
  endDate,
  wage,
  street,
  minimumDegree,
  workingHoursPerWeek,
  wagePeriod,
  webSiteLink,
  handleShowCompanyProfile,
  i18n
}) => (
  <Wrapper className={className}>
    <SubHeading>
      <Trans>Details</Trans>
    </SubHeading>

    <DetailsItem>
      <BuildingIcon src={buildingIcon} alt="Building icon" />

      <div>
        <Trans>{getCategoryLabel(category)} at</Trans>{' '}
        <Link onClick={handleShowCompanyProfile} styled>
          {companyName}
        </Link>
      </div>
    </DetailsItem>

    <DetailsItem>
      <LocationIcon src={locationIcon} alt="Location icon" />
      <div>
        {`${city}, ${country}`}
        <br />
        {street}
      </div>
    </DetailsItem>

    <DetailsItem>
      <TimeIcon src={timeIcon} alt="Time icon" />
      <div>
        <Trans>From {i18n._(t`${date(handleCorrectDate(start))}`)}</Trans>{' '}
        {endDate && <Trans> to {i18n._(t`${date(handleCorrectDate(endDate))}`)}</Trans>}
      </div>
    </DetailsItem>

    <DetailsItem>
      <WageIcon src={wageIcon} alt="Wage icon" />
      <div>
        {wage ? (
          `${money(wage)} ${getWagePeriodLabel(wagePeriod)}`
        ) : (
          <Trans>not informed</Trans>
        )}
      </div>
    </DetailsItem>

    {workingHoursPerWeek && (
      <DetailsItem>
        <WageIcon src={clockIcon} alt="Clock icon" />
        <div>
          <Trans>{workingHoursPerWeek} per week</Trans>
        </div>
      </DetailsItem>
    )}

    {minimumDegree && (
      <DetailsItem>
        <WageIcon src={teacherHatIcon} alt="Teacher Hat icon" />
        <div>{minimumDegree}</div>
      </DetailsItem>
    )}

    {webSiteLink && (
      <DetailsItem>
        <WageIcon src={wwwIcon} alt="Website icon" />
        <Link target="_blank" href={webSiteLink}>
          {webSiteLink}
        </Link>
      </DetailsItem>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
  width: 100%;
  @media (min-width: ${breakpoints.sm}) {
    width: 350px;
  }
`

const DetailsItem = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
  align-items: center;
`

const BuildingIcon = styled.img`
  width: 1.5rem;
  height: 1.7rem;
  margin-right: 1.3rem;
`

const LocationIcon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
`

const TimeIcon = styled.img`
  width: 0.9rem;
  height: 1.5rem;
  margin-right: 1.6rem;
  margin-left: 0.2rem;
`

const WageIcon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1.2rem;
`

export default withI18n()(JobDetailsInfo)
