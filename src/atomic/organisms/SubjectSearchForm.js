import React from 'react'
import styled from 'styled-components'
import Column from '../atoms/Column'
import Input from '../atoms/Input'
import FormField from '../molecules/FormField'
import FormRow from '../atoms/FormRow'
import SelectMulti from '../atoms/SelectMulti'
import SelectSimple from '../atoms/SelectSimple'
import huntDistances from '../../constants/huntDistances'
import {
  floatNumberFormatter,
  positiveIntegerFormatter
} from '../../services/inputFormatters'
import DatePicker from '../molecules/DatePicker'
import { SearchBar, TopBar, Filters, ApplyButton } from '../molecules/Search'
import typesOfDegree from '../../constants/typesOfDegree'
import minimumDegrees from '../../constants/minimumDegrees'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const SubjectSearchForm = ({
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
          t`Search by university name, subject title, country and city...`
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
                  name="cost_amount_from"
                  component={Input}
                  type="text"
                  label={i18n._(t`Cost from`)}
                  formatOptions={floatNumberFormatter}
                  withMargin
                />

                <FormField
                  name="cost_amount_to"
                  component={Input}
                  type="text"
                  formatOptions={floatNumberFormatter}
                  label={i18n._(t`Cost to`)}
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="nummerus_clausus"
                  component={Input}
                  type="text"
                  label={i18n._(t`Nummerus Clausus`)}
                  formatOptions={floatNumberFormatter}
                  withMargin
                />

                <FormField
                  name="start_date"
                  value={values.start_date}
                  component={DatePicker}
                  label={i18n._(t`Starting date (mm/dd/yyyy)`)}
                  custom
                  placeholder="mm/dd/yyyy"
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="duration_in_hours_from"
                  component={Input}
                  type="text"
                  label={i18n._(t`Duration from (h)`)}
                  formatOptions={positiveIntegerFormatter}
                  withMargin
                />

                <FormField
                  name="duration_in_hours_to"
                  component={Input}
                  type="text"
                  label={i18n._(t`Duration to (h)`)}
                  formatOptions={positiveIntegerFormatter}
                />
              </FormRow>
            </StyledColumn>

            <StyledColumn>
              <FormRow>
                <FormField
                  name="type_of_degree"
                  component={SelectMulti}
                  label={i18n._(t`Type of degree`)}
                  options={typesOfDegree}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="minimum_degree"
                  label={i18n._(t`Minimum Degree`)}
                  component={SelectMulti}
                  options={minimumDegrees}
                  custom
                />
              </FormRow>

              <FormRow>
                <FormField
                  name="distance"
                  component={SelectSimple}
                  custom
                  options={huntDistances()}
                  label={i18n._(t`Max distance`)}
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

export default withI18n()(SubjectSearchForm)
