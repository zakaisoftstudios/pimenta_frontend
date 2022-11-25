import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import Column from '../atoms/Column'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import genders from '../../constants/genders'
import mobilities from '../../constants/mobilities'
import { all as educationalLevels } from '../../constants/educationalLevels'
import SelectMulti from '../atoms/SelectMulti'
import SelectSimple from '../atoms/SelectSimple'
import ButtonRounded from '../atoms/ButtonRounded'
import { floatNumberFormatter } from '../../services/inputFormatters'
import { breakpoints } from '../../constants/responsive'
import magnifierIcon from '../../assets/icons/magnifier.svg'
import closeIcon from '../../assets/icons/close.svg'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const CompanyHuntForm = ({
  handleShowForm,
  showForm,
  handleSubmit,
  skills,
  interests,
  strengths,
  filterFired,
  resetForm,
  handleClearFilters,
  huntAges,
  huntDistances,
  values,
  i18n
}) => (
  <Wrapper>
    <Form onSubmit={handleSubmit}>
      <SearchBar>
        <FilterOpener>
          <MagnifierIcon src={magnifierIcon} />
          <FormField
            name="text_search"
            component={SearchInput}
            placeholder={i18n._(
              t`Search by name, skill, country, city and graduation...`
            )}
          />

          {!showForm && (
            <>
              <FilterButton
                onClick={handleShowForm(true)}>
                  {i18n._(t`Filter`)}
              </FilterButton>
              {filterFired && <CircleFilter />}
            </>
          )}
        </FilterOpener>
        {showForm && (
          <CloseIcon
            src={closeIcon}
            onClick={handleShowForm(false, values)}
            alt="Close form"
          />
        )}
      </SearchBar>
      {showForm && (
        <React.Fragment>
          <TopBar>
            <StyledSubHeading>
              <Trans>Filter by</Trans>
            </StyledSubHeading>
            <ClearFilters onClick={handleClearFilters}>
              <Trans>Clear filters</Trans>
            </ClearFilters>
          </TopBar>

          <Filters>
            <Column>
              <FormRow>
                <FormField
                  name="age_from"
                  component={SelectSimple}
                  options={huntAges}
                  label={i18n._(t`Age from`)}
                  custom
                  withMargin
                />

                <FormField
                  name="age_to"
                  component={SelectSimple}
                  options={huntAges}
                  label={i18n._(t`Age to`)}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="grade_point_average"
                  component={Input}
                  type="text"
                  label={i18n._(t`Max Average Grade`)}
                  withMargin
                  formatOptions={floatNumberFormatter}
                />

                <FormField
                  name="gender"
                  label={i18n._(t`Gender`)}
                  component={SelectMulti}
                  options={genders}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="mobility"
                  component={SelectMulti}
                  label={i18n._(t`Mobility`)}
                  options={mobilities}
                  custom
                  withMargin
                />

                <FormField
                  name="distance"
                  component={SelectSimple}
                  custom
                  options={huntDistances}
                  label={i18n._(t`Max distance`)}
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="educational_level"
                  component={SelectMulti}
                  label={i18n._(t`Educational Level`)}
                  options={educationalLevels}
                  custom
                />
              </FormRow>
            </Column>

            <Column noMargin>
              <FormRow>
                <FormField
                  name="skills"
                  component={SelectMulti}
                  label={i18n._(t`Skills`)}
                  placeholder={i18n._(t`Choose up to 5`)}
                  options={skills}
                  limit={5}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="interests"
                  component={SelectMulti}
                  label={i18n._(t`Interests`)}
                  placeholder={i18n._(t`Choose up to 5`)}
                  options={interests}
                  limit={5}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="strengths"
                  component={SelectMulti}
                  label={i18n._(t`Strengths`)}
                  placeholder={i18n._(t`Choose up to 5`)}
                  options={strengths}
                  limit={5}
                  custom
                />
              </FormRow>
            </Column>
          </Filters>
          <ApplyButton type="submit">
            <Trans>Apply</Trans>
          </ApplyButton>
        </React.Fragment>
      )}
    </Form>
  </Wrapper>
)

const SearchBar = styled.div`
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffff;
`

const Filters = styled.div`
  display: flex;
  margin-top: 1.2rem;
  flex-direction: column;
  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`

const ApplyButton = styled(ButtonRounded)`
  margin-left: auto;
`

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

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`

const StyledSubHeading = styled(SubHeading)`
  margin-bottom: 0;
`

export default withI18n()(CompanyHuntForm)
