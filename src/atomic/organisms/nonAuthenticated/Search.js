import React, { useState, useEffect } from 'react'
import Tab from '../../atoms/Tab'
import Tabs from '../../atoms/Tabs'
import SectionBox from '../../atoms/SectionBox'
import JobSearchContainer from '../../../containers/Student/Search/JobSearch'
import SubjectSearchContainer from '../../../containers/Student/Search/SubjectSearch'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { breakLineBiggerThan } from '../../../services/util/breakLineBiggerThan';

const searchTabs = {
  JOB_SEARCH: 'job_search',
  SUBJECT_SEARCH: 'subject_search'
}

function SearchNonAuthenticated({i18n}) {
  const [activeTab, setActiveTab] = useState(searchTabs.JOB_SEARCH)
  const [forJobs, setForJobs] = useState(i18n._(t`For Jobs`))
  const [forSubjects, setForSubjects] = useState(i18n._(t`For Subjects`))

  useEffect(() => {
    window.addEventListener("resize", resize)
    resize()
  }, [])

  const resize = () => {
    setForJobs(breakLineBiggerThan(forJobs, 13, 6));
    setForSubjects(breakLineBiggerThan(forSubjects, 13, 8))
  }

  const handleChangeTab = filter => () => setActiveTab(filter)

  return (
      <SectionBox>
        <Tabs>
          <Tab
            active={activeTab === searchTabs.JOB_SEARCH}
            handleActivate={handleChangeTab(searchTabs.JOB_SEARCH)}
          >
            {forJobs}
          </Tab>

          <Tab
            active={activeTab === searchTabs.SUBJECT_SEARCH}
            handleActivate={handleChangeTab(searchTabs.SUBJECT_SEARCH)}
          >
          {forSubjects}
          </Tab>
        </Tabs>

        {activeTab === searchTabs.JOB_SEARCH ? <JobSearchContainer isNoAuthenticated={true} hasNoAuthentication={true} /> : null}
        {activeTab === searchTabs.SUBJECT_SEARCH ? (
          <SubjectSearchContainer isNoAuthenticated={true} hasNoAuthentication={true}/>
        ) : null}
      </SectionBox>
    )
}

export default withI18n()(SearchNonAuthenticated)