import React from 'react'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import StudentSearch from '../../containers/Company/Search/StudentSearch'
import SubjectSearchContainer from '../../containers/Company/Search/SubjectSearch'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

const searchTabs = {
  STUDENT_SEARCH: 'student_search',
  SUBJECT_SEARCH: 'subject_search'
}

export default class CompanySearch extends React.Component {
  state = {
    activeTab: searchTabs.STUDENT_SEARCH
  }

  handleChangeTab = filter => () => this.setState({ activeTab: filter })

  render() {
    const { activeTab } = this.state

    return (
      <SectionBox>
        <StyledHeading>
          <Trans>Search</Trans>
        </StyledHeading>

        <Tabs>
          <Tab
            active={activeTab === searchTabs.STUDENT_SEARCH}
            handleActivate={this.handleChangeTab(searchTabs.STUDENT_SEARCH)}
          >
            <Trans>Hunting</Trans>
          </Tab>

          <Tab
            active={activeTab === searchTabs.SUBJECT_SEARCH}
            handleActivate={this.handleChangeTab(searchTabs.SUBJECT_SEARCH)}
          >
            <Trans>Subjects</Trans>
          </Tab>
        </Tabs>

        {activeTab === searchTabs.STUDENT_SEARCH ? <StudentSearch /> : null}
        {activeTab === searchTabs.SUBJECT_SEARCH ? (
          <SubjectSearchContainer />
        ) : null}
      </SectionBox>
    )
  }
}

const StyledHeading = styled(Heading)`
  margin-bottom: 0;
`
