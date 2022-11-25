import React from 'react'
import styled from 'styled-components'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import likesPageTabs from '../../constants/likesPageTabs'
import HuntedByContainer from '../../containers/Student/Likes/HuntedBy'
import LikesGivenContainer from '../../containers/Student/Likes/LikesGiven'
import SubjectLikesContainer from '../../containers/Student/Likes/SubjectLikes'
import { Trans } from '@lingui/macro'

const CompanyLikes = ({
  handleShowJobOffer,
  handleShowSubjectOffer,
  handleShowCompanyProfile,
  handleGoToChat,
  changeTab,
  activeTab
}) => (
  <SectionBox>
    <StyledHeading>Likes</StyledHeading>

    <Tabs>
      <Tab
        active={activeTab === likesPageTabs.LIKED}
        handleActivate={changeTab(likesPageTabs.LIKED)}
      >
        <Trans>Likes given</Trans>
      </Tab>

      <Tab
        active={activeTab === likesPageTabs.HUNTED_BY}
        handleActivate={changeTab(likesPageTabs.HUNTED_BY)}
      >
        <Trans>Hunted by</Trans>
      </Tab>

      <Tab
        active={activeTab === likesPageTabs.SUBJECTS}
        handleActivate={changeTab(likesPageTabs.SUBJECTS)}
      >
        <Trans>Subjects</Trans>
      </Tab>
    </Tabs>

    {renderTabComponent(activeTab, {
      handleShowCompanyProfile,
      handleShowJobOffer,
      handleShowSubjectOffer,
      handleGoToChat
    })}
  </SectionBox>
)

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`

const tabComponents = {
  [likesPageTabs.LIKED]: LikesGivenContainer,
  [likesPageTabs.HUNTED_BY]: HuntedByContainer,
  [likesPageTabs.SUBJECTS]: SubjectLikesContainer
}

const renderTabComponent = (activeTab, props) => {
  const Component = tabComponents[activeTab]
  return <Component {...props} />
}

export default CompanyLikes
