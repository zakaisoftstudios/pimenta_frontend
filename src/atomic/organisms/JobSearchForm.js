import React from 'react'
import styled from 'styled-components'
import Column from '../atoms/Column'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import SelectMulti from '../atoms/SelectMulti'
import SelectSimple from '../atoms/SelectSimple'
import jobOfferCategories from '../../constants/jobOfferCategories'
import minimumDegrees from '../../constants/minimumDegrees'
import huntDistances from '../../constants/huntDistances'
import { floatNumberFormatter } from '../../services/inputFormatters'
import DatePicker from '../molecules/DatePicker'
import { SearchBar, TopBar, Filters, ApplyButton } from '../molecules/Search'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const JobSearchForm = ({
  handleShowForm,
  showForm,
  handleSubmit,
  filterFired,
  handleReopen,
  values,
  setFieldValue,
  setFieldTouched,
  i18n
}) => (
  <Wrapper showForm={showForm}>
    <Form onSubmit={handleSubmit}>
      <SearchBar
        filterFired={filterFired}
        handleShowForm={handleShowForm}
        searchPlaceholder={i18n._(
          t`Search by company name, job title, country and city...`
        )}
        isFormOpen={showForm}
      />

      {showForm && (
        <React.Fragment>
          <TopBar handleReopen={handleReopen} />

          <Filters>
            <StyledColumn>
              <FormRow>
                <FormField
                  name="wage_from"
                  component={Input}
                  type="text"
                  label={i18n._(t`Wage from`)}
                  formatOptions={floatNumberFormatter}
                  withMargin
                />

                <FormField
                  name="wage_to"
                  component={Input}
                  type="text"
                  formatOptions={floatNumberFormatter}
                  label={i18n._(t`Wage to`)}
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="working_hours_per_week_from"
                  component={Input}
                  type="text"
                  label={i18n._(t`Working hours per week from`)}
                  formatOptions={floatNumberFormatter}
                  withMargin
                />

                <FormField
                  name="working_hours_per_week_to"
                  component={Input}
                  type="text"
                  label={i18n._(t`Working hours per week to`)}
                  formatOptions={floatNumberFormatter}
                  withMargin
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="start"
                  value={values.start}
                  component={DatePicker}
                  label={i18n._(t`Starting Date (mm/dd/yyyy)`)}
                  custom
                  placeholder="mm/dd/yyyy"
                  withMargin
                />

                <FormField
                  name="distance"
                  component={SelectSimple}
                  custom
                  options={huntDistances()}
                  label={i18n._(t`Max distance`)}
                />
              </FormRow>
            </StyledColumn>

            <StyledColumn>
              <FormRow>
                <FormField
                  name="category"
                  component={SelectMulti}
                  custom
                  options={jobOfferCategories}
                  label={i18n._(t`Role`)}
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="minimum_degree"
                  component={SelectMulti}
                  custom
                  options={minimumDegrees}
                  label={i18n._(t`Minimum Degree`)}
                />
              </FormRow>
            </StyledColumn>
          </Filters>
          <ApplyButton type="submit">
            <Trans>Apply</Trans>
          </ApplyButton>
        </React.Fragment>
      )}
    </Form>
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${({ showForm }) => (showForm ? '6rem' : '')};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffff;
`

const StyledColumn = styled(Column)`
  width: 50%;
`

export default withI18n()(JobSearchForm)
