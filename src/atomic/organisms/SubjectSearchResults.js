import React from 'react'
import styled from 'styled-components'
import Loader from '../atoms/Loader'
import SubjectSearchResultActions from '../molecules/SubjectSearchResultActions'
import SubHeading from '../atoms/SubHeading'
import SelectSimple from '../atoms/SelectSimple'
import ItalicText from '../atoms/ItalicText'
import roundStarIcon from '../../assets/icons/round-star.svg'
import SubjectOffer from '../molecules/SubjectOffer'
import studentSearchOrders from '../../constants/studentSearchOrders'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const SubjectSearchResults = ({
  loadingResults,
  results,
  handleShowSubjectOffer,
  handleSubjectLikeAction,
  showForm,
  showOrderBy = true,
  filterFired,
  paginationComponent,
  totalItemsCount,
  handleOrderChange,
  orderBy,
  i18n
}) => (
  <React.Fragment>
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
      
      { showOrderBy && (
        <div>
          <SelectSimple
            name="order_by"
            options={studentSearchOrders}
            handleChange={handleOrderChange}
            label={i18n._(t`Order by`)}
            value={orderBy}
          />
        </div>
      )}
    </ResultsHeading>

    {filterFired ? (
      loadingResults ? (
        <Loader />
      ) : (
        <Wrapper showForm={showForm}>
          <Results>
            {results.length > 0 ? (
              results.map((subjectOffer, i) => {
                return (
                  <SubjectOffer
                    key={subjectOffer.id}
                    subjectOffer={subjectOffer}
                    handleClick={handleShowSubjectOffer(subjectOffer)}
                    actions={
                      <SubjectSearchResultActions
                        handleSubjectLikeAction={handleSubjectLikeAction(
                          subjectOffer
                        )}
                        subjectLike={subjectOffer.like}
                      />
                    }
                  />
                )
              })
            ) : (
              <ItalicText>
                <Trans>
                  there's no subject offers that match your current search
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
              Filter your dream subject and we help you find it!
            </Trans>
          </IntroText>
        </IntroContent>
      </IntroWrapper>
    )}

    {paginationComponent}
  </React.Fragment>
)

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  &:last-child: {
    margin-right: 0;
  }
`

const ResultsHeading = styled.div`
  display: flex;
  margin-bottom: 2.4rem;
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

export default withI18n()(SubjectSearchResults)
