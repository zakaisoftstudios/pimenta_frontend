import React from 'react'
import styled from 'styled-components'
import Card, { CardDropdown } from '../atoms/Card'
import locationIcon from '../../assets/icons/location.svg'
import wwwIcon from '../../assets/icons/www.svg'
import { breakpoints } from '../../constants/responsive'
import ProfilePic from '../atoms/ProfilePic'
import { profilePicTypes } from '../../constants/componentTypes'
import { getAvatarPicture } from '../../services/attachments'
import ItalicText from '../atoms/ItalicText'
import { date } from '../../services/locale'
import Link from '../atoms/Link'
import { withI18n } from '@lingui/react'
import { plural } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'

const CompanyCard = ({
  className,
  profile: {
    name,
    attachments,
    city,
    country,
    industry_sector,
    number_of_employees
  },
  jobOffers,
  handleShowJobOffer,
  actions,
  createdAt,
  handleShowCompanyProfile,
  i18n
}) => (
  <StyledCard className={className}>
    <Content>
      <Info>
        <Wrapper
          onClick={handleShowCompanyProfile}
          clickable={handleShowCompanyProfile}
        >
          <ProfilePic
            profilePic={getAvatarPicture(attachments)}
            type={profilePicTypes.MEDIUM}
          />

          <DetailsInfo>
            <Name>{name}</Name>
            <Industry>
              {industry_sector} - {country}
            </Industry>
          </DetailsInfo>
        </Wrapper>

        <Details>
          <DetailsItem>
            <LocationIcon src={locationIcon} alt="Location icon" />
            <div>{`${city}, ${country}`}</div>
          </DetailsItem>
          <DetailsItem>
            <WwwIcon alt="Website icon" src={wwwIcon} />
            <div>
              {i18n._(
                plural({
                  value: number_of_employees,
                  one: '# Employee',
                  other: '# Employees'
                })
              )}
            </div>
          </DetailsItem>
          <PostedAt>
            <Trans>Hunted at {i18n._(t`${date(createdAt)}`)}</Trans>
          </PostedAt>
        </Details>
      </Info>
      {actions}
    </Content>

    <CardDropdown
      title={i18n._(
        plural({
          value: jobOffers.length,
          one: '# job',
          other: '# jobs'
        })
      )}
      items={jobOffers.map(jobOffer => (
        <Link onClick={handleShowJobOffer(jobOffer)}>{jobOffer.content}</Link>
      ))}
    />
  </StyledCard>
)

const JobOfferLink = styled.div`
  cursor: pointer;
  color: #21c8ed;
  display: inline-block;
`

const PostedAt = styled(ItalicText)`
  margin-left: 0.4rem;
  color: #c4c4c4;
`

const WwwIcon = styled.img`
  width: 1.3rem;
  height: 1.8rem;
  margin-right: 1.4rem;
  margin-left: 0.4rem;
`

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
  margin-bottom: 1.2rem;
`

const Industry = styled.div`
  font-weight: ${({ big }) => (big ? 'normal' : '300')};
  color: #21c8ed;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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

const Wrapper = styled.div`
  display: flex;
  align-self: flex-start;
  cursor: ${({ clickable }) => clickable && 'pointer'};
`

const DetailsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ big }) => (big ? 'flex-end' : 'center')};
  margin-left: 1.2rem;
`

const Name = styled.div`
  font-weight: ${({ big }) => (big ? '500' : '300')};
  font-size: ${({ big }) => (big ? '20px' : '16px')};
  color: #000000;
  margin-bottom: ${({ big }) => (big ? '0.6rem' : '0.2rem')};
`

export default withI18n()(CompanyCard)
