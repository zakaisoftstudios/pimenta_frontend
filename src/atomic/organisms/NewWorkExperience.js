import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Divider from '../atoms/Divider'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import ButtonBar from '../molecules/ButtonBar'
import Input from '../atoms/Input'
import FormRow from '../atoms/FormRow'
import DatePicker from '../molecules/DatePicker'
import SelectSimple from '../atoms/SelectSimple'
import * as WorkExperienceTypes from '../../constants/workExperienceTypes'
import TextArea from '../atoms/TextArea'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const StudentProfileEditNewWorkExperience = ({
  handleClearNewForm,
  values,
  handleReset,
  handleSubmit,
  itemToEdit,
  i18n
}) => (
  <React.Fragment>
    <Divider />

    <Form>
      <FormRow>
        <FormField name="title" component={Input} label={i18n._(t`Job Role`)} />
      </FormRow>

      <FormRow>
        <FormField
          name="from"
          value={values.from}
          component={DatePicker}
          label={i18n._(t`From (mm/dd/yyyy)`)}
          custom
          placeholder="mm/dd/yyyy"
          withMargin
        />

        <FormField
          name="to"
          value={values.to}
          component={DatePicker}
          label={i18n._(t`To (mm/dd/yyyy)`)}
          custom
          placeholder="mm/dd/yyyy"
        />
      </FormRow>

      <FormRow>
        <FormField
          name="kind"
          component={SelectSimple}
          custom
          options={WorkExperienceTypes.all}
          label={i18n._(t`Type`)}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="company_name"
          component={Input}
          label={i18n._(t`Institution`)}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="department"
          component={Input}
          label={i18n._(t`Department`)}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="city"
          component={Input}
          label={i18n._(t`City`)}
          withMargin
        />

        <FormField
          name="country"
          component={Input}
          label={i18n._(t`Country`)}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="tasks"
          component={TextArea}
          label={i18n._(t`Tasks`)}
          regularLabel
        />
      </FormRow>

      <ButtonBar mini>
        <Button
          type="button"
          handleClick={handleClearNewForm(handleReset)}
          mini
        >
          <Trans>Cancel</Trans>
        </Button>
        <Button type="button" handleClick={handleSubmit}>
          {itemToEdit ? i18n._(t`Update`) : i18n._(t`Add`)}
        </Button>
      </ButtonBar>
    </Form>
  </React.Fragment>
)

const Form = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`

StudentProfileEditNewWorkExperience.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleClearNewForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withI18n()(StudentProfileEditNewWorkExperience)
