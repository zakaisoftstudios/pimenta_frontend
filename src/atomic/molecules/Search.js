import React from 'react'
import styled from 'styled-components'
import FormField from '../molecules/FormField'
import magnifierIcon from '../../assets/icons/magnifier.svg'
import closeIcon from '../../assets/icons/close.svg'
import Input from '../atoms/Input'
import SubHeading from '../atoms/SubHeading'
import { breakpoints } from '../../constants/responsive'
import ButtonRounded from '../atoms/ButtonRounded'
import { Trans } from '@lingui/macro'

export const SearchBar = ({
  filterFired,
  handleShowForm,
  searchPlaceholder,
  isFormOpen
}) => (
  <SearchWrapper>
    <FilterOpener>
      <MagnifierIcon src={magnifierIcon} />
      <FormField
        name="text_search"
        component={SearchInput}
        placeholder={searchPlaceholder}
      />

      {!isFormOpen && (
            <>
              <FilterButton
                onClick={handleShowForm(true)}>
                  <Trans>Filter</Trans>
              </FilterButton>
            </>
      )}
    </FilterOpener>

    {isFormOpen && (
      <CloseIcon
        src={closeIcon}
        onClick={handleShowForm(false)}
        alt="Close form"
      />
    )}
  </SearchWrapper>
)

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 100%;
  margin-bottom: 4.8rem;
  margin-top: 1.2rem;
`

const SearchInput = styled(Input)`
  margin: 15px 15px 0 0;
`

const FilterOpener = styled.div`
  display: flex;
  position: relative;
  width: 45rem;
  padding-bottom: 1rem;
`
const MagnifierIcon = styled.img`
  margin-left: 1rem;
  margin-right: 1.2rem;
`

const CloseIcon = styled.img`
  cursor: pointer;
`

const FilterButton = styled.a`
  padding: 5px;
  padding-left: 9px;
  margin-top: 18px;
  margin-left: auto;
  cursor: pointer;
  height: 30px;
  width: 64px;
  background-color: transparent;
  color: rgba(1,197,229,0.846178);
  border-color: rgba(1,197,229,0.846178);
  border-radius: 5px;
  border-style: solid;
  line-height: 1.15;
  border-width: 2px;
`

const CircleFilter = styled.div`
  background-color: #F60808;
  z-index: 10;
  width: 8px;
  height: 6px;
  border-radius: 10px;
  margin-top: 21px;
  margin-left: -10px;
`

export const TopBar = ({ handleReopen }) => (
  <TopBarWrapper>
    <StyledSubHeading>
      <Trans>Filter by</Trans>
    </StyledSubHeading>
    <ClearFilters onClick={handleReopen}>
      <Trans>Clear filters</Trans>
    </ClearFilters>
  </TopBarWrapper>
)

const ClearFilters = styled.div`
  cursor: pointer;
  color: #c4c4c4;
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #c4c4c4;
  transition: color 0.2s;

  &:hover {
    color: #757575;
    border-bottom: 2px solid #757575;
  }
`

const StyledSubHeading = styled(SubHeading)`
  margin-bottom: 0;
`

const TopBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`

export const Filters = styled.div`
  display: flex;
  margin-top: 1.2rem;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

export const ApplyButton = styled(ButtonRounded)`
  margin-left: auto;
`
