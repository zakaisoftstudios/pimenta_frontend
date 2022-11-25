import React from 'react'
import styled from 'styled-components'
import StudentCard from '../molecules/StudentCard'
import Loader from '../atoms/Loader'
import CompanyHuntResultActions from '../molecules/CompanyHuntResultActions'
import SubHeading from '../atoms/SubHeading'
import ItalicText from '../atoms/ItalicText'
import roundStarIcon from '../../assets/icons/round-star.svg'
import huntStatuses from '../../constants//huntStatuses'
import { Trans } from '@lingui/macro'

const CompanyHuntResults = ({
  loadingResults,
  results,
  handleShowStudentProfile,
  handleHuntAction,
  showForm,
  paginationComponent
}) => (
  <React.Fragment>
    {loadingResults ? (
        <Loader />
      ) : (
        <Wrapper showForm={showForm}>
          <ResultsHeading>
            <StyledSubHeading>
              <Trans>Results</Trans>
            </StyledSubHeading>
          </ResultsHeading>

          <Results>
            {results.length > 0 ? (
              results.map((result, i) => (
                <StudentCard
                  key={result.id}
                  rejected={result.hunt_status === huntStatuses.REJECTED}
                  profile={result}
                  handleShowStudentProfile={handleShowStudentProfile(i)}
                  actions={
                    <CompanyHuntResultActions
                      handleHuntAction={handleHuntAction(result.id)}
                      huntStatus={result.hunt_status}
                    />
                  }
                />
              ))
            ) : (
              <ItalicText>
                <Trans>
                  there are no students who match your current search
                </Trans>
              </ItalicText>
            )}
          </Results>
        </Wrapper>
      )
    }

    {paginationComponent}
  </React.Fragment>
)

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ResultsHeading = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
`

const StyledSubHeading = styled(SubHeading)`
  margin-bottom: 0.4rem;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: ${({ showForm }) => showForm && 'none'};
`

const IntroWrapper = styled.div`
  display: flex;
  display: ${({ showForm }) => showForm && 'none'};
  justify-content: center;
  align-items: center;
  ${'' /* margin-top: 14.5rem; */} flex: 1;
`

const IntroContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
`

const IntroText = styled.span`
  font-size: 20px;
  color: rgba(1, 197, 229, 0.846178);
  position: absolute;
  text-align: center;
  top: 79%;
  left: auto;
`

export default CompanyHuntResults
