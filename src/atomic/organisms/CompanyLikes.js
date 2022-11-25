import React from 'react'
import styled from 'styled-components'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import likesPageTabs from '../../constants/likesPageTabs'
import LikedFromContainer from '../../containers/Company/Likes/LikedFrom'
import HuntingListContainer from '../../containers/Company/Likes/HuntingList'
import SubjectLikesContainer from '../../containers/Company/Likes/SubjectLikes'
import { Trans } from '@lingui/macro'

const CompanyLikes = ({
  handleShowStudentProfile,
  handleGoToChat,
  handleShowSubjectOffer,
  changeTab,
  activeTab
}) => (
  <SectionBox>
    <StyledHeading>
      <Trans>Likes</Trans>
    </StyledHeading>

    <Tabs>
      <Tab
        active={activeTab === likesPageTabs.LIKED_FROM}
        handleActivate={changeTab(likesPageTabs.LIKED_FROM)}
      >
        <Trans>Liked from</Trans>
      </Tab>
      <Tab
        active={activeTab === likesPageTabs.HUNTED}
        handleActivate={changeTab(likesPageTabs.HUNTED)}
      >
        <Trans>Hunted</Trans>
      </Tab>
      <Tab
        active={activeTab === likesPageTabs.SUBJECTS}
        handleActivate={changeTab(likesPageTabs.SUBJECTS)}
      >
        <Trans>Subjects</Trans>
      </Tab>
    </Tabs>

    {renderTabComponent(activeTab, {
      handleShowStudentProfile,
      handleShowSubjectOffer,
      handleGoToChat
    })}
  </SectionBox>
)

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

const tabComponents = {
  [likesPageTabs.LIKED_FROM]: LikedFromContainer,
  [likesPageTabs.HUNTED]: HuntingListContainer,
  [likesPageTabs.SUBJECTS]: SubjectLikesContainer
}

const renderTabComponent = (activeTab, props) => {
  const Component = tabComponents[activeTab]
  return <Component {...props} />
}

export default CompanyLikes
