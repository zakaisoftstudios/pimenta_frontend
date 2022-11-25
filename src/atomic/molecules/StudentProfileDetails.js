import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SubHeading from '../atoms/SubHeading'
import locationIcon from '../../assets/icons/location.svg'
import starIcon from '../../assets/icons/star.svg'
import clockIcon from '../../assets/icons/clock.svg'
import airplaneIcon from '../../assets/icons/airplane.svg'
import carIcon from '../../assets/icons/car.svg'
import suitcaseIcon from '../../assets/icons/suitcase.svg'
import graduationCapIcon from '../../assets/icons/graduation-cap.svg'
import { date } from '../../services/locale'
import { age } from '../../services/util/time'
import { afirmationFromBool } from '../../services/util/string'
import Link from '../atoms/Link'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { getCurrentJobStatusesLabel } from '../../constants//currentJobStatuses'
import { getHighestGraduationLevelLabel } from '../../constants/highestGraduationLevels'
import studyIcon from '../../assets/icons/study.svg'
import { getMobilityLabel } from '../../constants/mobilities'

const StudentProfileDetails = ({
  gradePointAverage,
  dateOfBirth,
  mobility,
  drivingLicense,
  currentJobStatus,
  highestGraduationLevel,
  areaOfGraduation,
  i18n
}) => {
  const details = [
    {
      alt: 'Age',
      src: clockIcon,
      width: '1.7rem',
      height: '1.7rem',
      content: i18n._(
        t`Was born at ${date(dateOfBirth)} - ${age(dateOfBirth)} years`
      )
    },
    {
      alt: 'Current job status',
      src: suitcaseIcon,
      width: '1.7rem',
      height: '1.7rem',
      content: getCurrentJobStatusesLabel(currentJobStatus)
    },
    {
      alt: 'Highest graduation level',
      src: graduationCapIcon,
      width: '2rem',
      height: '2rem',
      content: getHighestGraduationLevelLabel(highestGraduationLevel)
    },
    {
      alt: 'Area of  graduation',
      src: studyIcon,
      width: '2.1rem',
      height: '2.1rem',
      content: areaOfGraduation
    },
    {
      alt: 'Grade Point Average',
      src: starIcon,
      width: '1.9rem',
      height: '1.9rem',
      content: i18n._(t`Average grade ${gradePointAverage}`)
    },
    {
      alt: 'Mobility',
      src: airplaneIcon,
      width: '2.3rem',
      height: '2.3rem',
      content: i18n._(t`Available for mobility: ${getMobilityLabel(mobility)}`)
    },
    {
      alt: 'Driver license',
      src: carIcon,
      width: '1.8rem',
      height: '1.6rem',
      content: i18n._(
        t`Has driver license: ${afirmationFromBool(drivingLicense === 'true' ? true : false)}`
      )
    }
  ]

  return (
    <Wrapper>
      <SubHeading>
        <Trans>Details</Trans>
      </SubHeading>

      {details.map(
        ({ content, ...styles }, i) =>
          content && (
            <Detail key={i}>
              <IconWrapper>
                <DetailIcon {...styles} />
              </IconWrapper>
{console.log(content)}
              {content}
            </Detail>
          )
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5.4rem;
`

const Detail = styled.div`
  display: flex;
  margin-bottom: 1.2rem;
  font-weight: 300;
  align-items: center;
`

const IconWrapper = styled.div`
  width: 2.3rem;
  display: flex;
  justify-content: center;
  margin-right: 1.2rem;
`

const DetailIcon = styled.img`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

StudentProfileDetails.propTypes = {
  postalCode: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  homePage: PropTypes.string,
  facebookLink: PropTypes.string,
  twitterLink: PropTypes.string,
  youtubeLink: PropTypes.string
}

export default withI18n()(StudentProfileDetails)
