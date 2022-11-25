import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Divider from '../atoms/Divider'
import Button from '../atoms/Button'
import ButtonBar from '../molecules/ButtonBar'
import * as EducationalLevels from '../../constants/educationalLevels'
import FormField from '../molecules/FormField'
import Input from '../atoms/Input'
import FormRow from '../atoms/FormRow'
import DatePicker from '../molecules/DatePicker'
import SelectSimple from '../atoms/SelectSimple'
import { floatNumberFormatter } from '../../services/inputFormatters'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'

const StudentProfileEditNewEducationEntry = ({
  handleClearAddEducation,
  setFieldTouched,
  setFieldValue,
  values,
  errors,
  touched,
  handleReset,
  handleSubmit,
  itemToEdit,
  i18n
}) => (
  <React.Fragment>
    <Divider />
    <Form>
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
          name="school_name"
          component={Input}
          label={i18n._(t`School Name`)}
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
          name="educational_level"
          component={SelectSimple}
          custom
          options={EducationalLevels.all}
          label={i18n._(t`Educational Level`)}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="grade_point_average"
          component={Input}
          label={i18n._(t`Average Grade`)}
          type="text"
          formatOptions={floatNumberFormatter}
        />
      </FormRow>

      <FormRow>
        <FormField
          name="area_of_graduation"
          component={Input}
          label={i18n._(t`Area of graduation`)}
        />
      </FormRow>

      <ButtonBar mini>
        <Button
          type="button"
          handleClick={handleClearAddEducation(handleReset)}
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

StudentProfileEditNewEducationEntry.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleClearAddEducation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default withI18n()(StudentProfileEditNewEducationEntry)
