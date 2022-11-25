import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Loader from '../../atoms/Loader'
import JobSearchResultActions from '../../molecules/JobSearchResultActions'
import SubHeading from '../../atoms/SubHeading'
import ItalicText from '../../atoms/ItalicText'
import roundStarIcon from '../../../assets/icons/round-star.svg'
import JobOfferNonAuthenticated from '../../molecules/nonAuthenticated/JobOffer'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

function JobSearchResultsNonAuthenticated ({
  loadingResults,
  results,
  handleShowJobOffer,
  handleJobLikeAction,
  showForm,
  filterFired,
  paginationComponent,
  totalItemsCount
}) {
  const [marginLeft, setMarginLeft] = useState(window.innerWidth > 765 ? '3rem;' : '0px;');

  useEffect(() => {
    window.addEventListener('resize', () => setMarginLeft(window.innerWidth > 765 ? '3rem;' : '0px;'));
  }, [])

  const Results = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: ${marginLeft}
 `

  return (
  <>
    <ResultsHeading>
      <div>
        <StyledSubHeading>
          <Trans>Results</Trans>
        </StyledSubHeading>
        {!loadingResults && (
          <ItalicText>
            <Trans>{totalItemsCount} found</Trans>
          </ItalicText>
        )}
      </div>
    </ResultsHeading>

    {filterFired ? (
      loadingResults ? (
        <Loader />
      ) : (
        <Wrapper showForm={showForm}>
          <Results>
            {results.length > 0 ? (
              results.map((jobOffer, i) => {
                return (
                  <JobOfferNonAuthenticated
                    key={jobOffer.id}
                    jobOffer={jobOffer}
                    handleClick={handleShowJobOffer(jobOffer)}
                    actions={
                      <JobSearchResultActions
                        jobLikeStatus={jobOffer.job_like_status}
                        handleJobLikeAction={handleJobLikeAction(jobOffer.id)}
                      />
                    }
                  />
                )
              })
            ) : (
              <ItalicText>
                <Trans>
                  there's no job offers that match your current search
                </Trans>
              </ItalicText>
            )}
          </Results>
        </Wrapper>
      )
    ) : (
      <IntroWrapper showForm={showForm}>
        <IntroContent>
          <img src={roundStarIcon} alt="Round star" />

          <IntroText>
            <Trans>
              How far should be your next step? <br />
              A new city or a higher wage? <br />
              Maybe you know the industry, but <br />
              aren't sure about THE company. <br />
              <br />
              Filter your dream job and we help you find it!
            </Trans>
          </IntroText>
        </IntroContent>
      </IntroWrapper>
    )}

    {paginationComponent}
  </>
)}

const ResultsHeading = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
  margin-left: 4rem;
  justify-content: space-between;
  align-items: center;
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

export default withI18n()(JobSearchResultsNonAuthenticated)
