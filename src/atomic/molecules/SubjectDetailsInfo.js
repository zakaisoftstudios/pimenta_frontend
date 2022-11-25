import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import buildingIcon from '../../assets/icons/building.svg'
import locationIcon from '../../assets/icons/location.svg'
import timeIcon from '../../assets/icons/time.svg'
import wageIcon from '../../assets/icons/wage.svg'
import clockIcon from '../../assets/icons/clock.svg'
import doneIcon from '../../assets/icons/done.svg'
import certificateIcon from '../../assets/icons/certificate.svg'
import teacherHatIcon from '../../assets/icons/teacher-hat.svg'
import Link from '../atoms/Link'
import { getTypeOfDegreeLabel } from '../../constants/typesOfDegree'
import { date, money, number } from '../../services/locale'
import { breakpoints } from '../../constants/responsive'
import { getDegreeLabel } from '../../constants/minimumDegrees'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import wwwIcon from '../../assets/icons/www.svg'
import { subjectCostPeriodLabel } from '../../constants/subjectCostPeriods'
import { handleCorrectDate } from '../../services/util/handleDate'

const SubjectDetailsInfo = ({
  className,
  universityName,
  typeOfDegree,
  city,
  country,
  street,
  startDates,
  durationInHours,
  costPeriod,
  costAmount,
  hoursOfClassesPerWeek,
  nummerusClausus,
  minimumDegree,
  handleShowUniversityProfile,
  webSiteLink,
  i18n
}) => (
  <Wrapper className={className}>
    <SubHeading>
      <Trans>Details</Trans>
    </SubHeading>

    <DetailsItem>
      <CertificateIcon src={certificateIcon} alt="Certificate icon" />

      <div>
        <Trans>{getTypeOfDegreeLabel(typeOfDegree)} at</Trans>{' '}
        <Link onClick={handleShowUniversityProfile} styled>
          {universityName}
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
        <ListStartDate>
          {startDates.map((startDate) =>
            <ListChildStartDate>
              From {i18n._(t`${date(handleCorrectDate(startDate))}`)}
            </ListChildStartDate>
          )}
        </ListStartDate>
        • {durationInHours}h
    </DetailsItem>

    <DetailsItem>
      <Icon src={wageIcon} alt="Wage icon" />
      <div>
        {costAmount ? (
          `${money(costAmount)} ${subjectCostPeriodLabel(costPeriod)}`
        ) : (
          <Trans>not informed</Trans>
        )}
      </div>
    </DetailsItem>

    {hoursOfClassesPerWeek && (
      <DetailsItem>
        <Icon src={clockIcon} alt="Clock icon" />
        <div>
          <Trans>{hoursOfClassesPerWeek}h per week</Trans>
        </div>
      </DetailsItem>
    )}

    <DetailsItem>
      <Icon src={teacherHatIcon} alt="Teacher Hat icon" />
      <div>{getDegreeLabel(minimumDegree)}</div>
    </DetailsItem>

    {nummerusClausus && (
      <DetailsItem>
        <Icon src={doneIcon} alt="Done icon" />
        <div>
          <Trans>Nummerus clausus: {number(nummerusClausus)}</Trans>
        </div>
      </DetailsItem>
    )}

    {webSiteLink && (
      <DetailsItem>
        <Icon src={wwwIcon} alt="Website icon" />
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

const CertificateIcon = styled.img`
  width: 1.8rem;
  height: 2rem;
  margin-right: 1.3rem;
`

const LocationIcon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
  margin-left: 0.2rem;
`

const TimeIcon = styled.img`
  width: 1.3rem;
  height: 1.5rem;
  margin-right: 1.4rem;
  margin-left: 0.2rem;
`

const Icon = styled.img`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1.2rem;
`

const ListStartDate = styled.ul`
  margin-left: -28px;
  margin-right: 6px;
  margin-top: -0.1px;
  margin-bottom: -0.1px;
`

const ListChildStartDate = styled.li`
  list-style-type: circle;
`

export default withI18n()(SubjectDetailsInfo)
