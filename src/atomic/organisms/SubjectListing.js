import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import SectionBox from '../atoms/SectionBox'
import ProfileSubjectHeader from '../molecules/ProfileSubjectHeader'
import ActionHeading from '../molecules/ActionHeading'
import { subjectOfferStates } from '../../constants/subjectOfferStates'
import SubjectOffer from '../molecules/SubjectOffer'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import plusIcon from '../../assets/icons/plus.svg'
import SubjectOfferCardActions from '../molecules/SubjectOfferCardActions'
import ItalicText from '../atoms/ItalicText'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const SubjectListing = ({
  loadingSubjectOffers,
  subjectOffers,
  userName,
  profilePic,
  stateFilter,
  changeFilter,
  showSubjectDetails,
  paginationComponent,
  totalItemsCount,
  handleRemoveSubjectOffer,
  i18n
}) => (
  <SectionBox>
    <ProfileSubjectHeader
      userName={userName}
      profilePic={profilePic}
      totalItemsCount={totalItemsCount}
    />

    <ActionHeading
      title="Subject Offers"
      actionName={i18n._(t`Add`)}
      actionPath="/university/subject-offers/new"
      buttonIcon={plusIcon}
    />

    <Tabs>
      <Tab
        active={stateFilter === subjectOfferStates.PUBLISHED}
        handleActivate={changeFilter(subjectOfferStates.PUBLISHED)}
      >
        <Trans>Published</Trans>
      </Tab>
      <Tab
        active={stateFilter === subjectOfferStates.UNPUBLISHED}
        handleActivate={changeFilter(subjectOfferStates.UNPUBLISHED)}
      >
        <Trans>Unpublished</Trans>
      </Tab>
    </Tabs>

    {loadingSubjectOffers ? (
      <Loader />
    ) : (
      <React.Fragment>
        {subjectOffers.length > 0 ? (
          <SubjectOffers>
            {subjectOffers.map(subjectOffer => (
              <SubjectOffer
                key={subjectOffer.id}
                subjectOffer={subjectOffer}
                handleClick={showSubjectDetails(subjectOffer)}
                actions={
                  <SubjectOfferCardActions
                    handleRemoveSubjectOffer={handleRemoveSubjectOffer(
                      subjectOffer.id
                    )}
                  />
                }
              />
            ))}
          </SubjectOffers>
        ) : (
          <ItalicText>
            {stateFilter === subjectOfferStates.PUBLISHED
              ? i18n._(t`you don't have any published Subject Offer yet`)
              : i18n._(t`you don't have any unpublished Subject Offer yet`)}
          </ItalicText>
        )}
      </React.Fragment>
    )}

    <Pagination>{paginationComponent}</Pagination>
  </SectionBox>
)

const SubjectOffers = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`

const Pagination = styled.div`
  margin-top: auto;
  width: 100%;
  align-self: center;
`

export default withI18n()(SubjectListing)
