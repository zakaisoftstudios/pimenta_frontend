import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import SectionBox from '../atoms/SectionBox'
import ProfileJobsHeader from '../molecules/ProfileJobsHeader'
import ActionHeading from '../molecules/ActionHeading'
import { jobOfferStates } from '../../constants/jobOfferStates'
import JobOffer from '../molecules/JobOffer'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import plusIcon from '../../assets/icons/plus.svg'
import JobOfferCardActions from '../molecules/JobOfferCardActions'
import ItalicText from '../atoms/ItalicText'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const JobListing = ({
  loadingJobOffers,
  jobOffers,
  userName,
  profilePic,
  stateFilter,
  changeFilter,
  showJobDetails,
  paginationComponent,
  totalItemsCount,
  handleRemoveJobOffer,
  i18n
}) => (
  <SectionBox>
    <ProfileJobsHeader
      userName={userName}
      profilePic={profilePic}
      totalItemsCount={totalItemsCount}
    />

    <ActionHeading
      title="Job Offerrs"
      // title={i18n._(t`Job Offers`)}
      actionName={i18n._(t`Add`)}
      actionPath="/company/jobs/new"
      buttonIcon={plusIcon}
    />

    <Tabs>
      <Tab
        active={stateFilter === jobOfferStates.PUBLISHED}
        handleActivate={changeFilter(jobOfferStates.PUBLISHED)}
      >
        <Trans>Published</Trans>
      </Tab>
      <Tab
        active={stateFilter === jobOfferStates.UNPUBLISHED}
        handleActivate={changeFilter(jobOfferStates.UNPUBLISHED)}
      >
        <Trans>Unpublished</Trans>
      </Tab>
    </Tabs>

    {loadingJobOffers ? (
      <Loader />
    ) : (
      <React.Fragment>
        {jobOffers.length > 0 ? (
          <JobOffers>
            {jobOffers.map(jobOffer => (
              <JobOffer
                key={jobOffer.id}
                jobOffer={jobOffer}
                handleClick={showJobDetails(jobOffer)}
                actions={
                  <JobOfferCardActions
                    handleRemoveJobOffer={handleRemoveJobOffer(jobOffer.id)}
                  />
                }
              />
            ))}
          </JobOffers>
        ) : (
          <ItalicText>
            {stateFilter === jobOfferStates.PUBLISHED
              ? i18n._(t`you don't have any published Job Offer yet`)
              : i18n._(t`you don't have any unpublished Job Offer yet`)}
          </ItalicText>
        )}
      </React.Fragment>
    )}

    <Pagination>{paginationComponent}</Pagination>
  </SectionBox>
)

const JobOffers = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

const Pagination = styled.div`
  margin-top: auto;
  width: 100%;
  align-self: center;
`

export default withI18n()(JobListing)
