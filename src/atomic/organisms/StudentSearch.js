import React from 'react'
import Tab from '../atoms/Tab'
import Tabs from '../atoms/Tabs'
import SectionBox from '../atoms/SectionBox'
import Heading from '../atoms/Heading'
import JobSearchContainer from '../../containers/Student/Search/JobSearch'
import SubjectSearchContainer from '../../containers/Student/Search/SubjectSearch'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

const searchTabs = {
  JOB_SEARCH: 'job_search',
  SUBJECT_SEARCH: 'subject_search'
}

export default class StudentSearch extends React.Component {
  state = {
    activeTab: searchTabs.JOB_SEARCH
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
            active={activeTab === searchTabs.JOB_SEARCH}
            handleActivate={this.handleChangeTab(searchTabs.JOB_SEARCH)}
          >
            <Trans>For Jobs</Trans>
          </Tab>

          <Tab
            active={activeTab === searchTabs.SUBJECT_SEARCH}
            handleActivate={this.handleChangeTab(searchTabs.SUBJECT_SEARCH)}
          >
            <Trans>For Subjects</Trans>
          </Tab>
        </Tabs>

        {activeTab === searchTabs.JOB_SEARCH ? <JobSearchContainer /> : null}
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
