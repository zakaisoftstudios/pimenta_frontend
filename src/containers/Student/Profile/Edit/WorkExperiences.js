import React from 'react'
import PropTypes from 'prop-types'
import WorkExperiences from '../../../../atomic/organisms/WorkExperiences'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class StudentProfileEditWorkExperiencesContainer extends React.Component {
  initialValues = () => ({
    from: '',
    to: '',
    title: '',
    kind: '',
    company_name: '',
    department: '',
    city: '',
    country: '',
    tasks: '',
    selected_kind: null
  })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      from: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
        .required(i18n._(t`From is required`)),
      to: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`)),
      title: Yup.string().required(i18n._(t`Job Role is required`)),
      kind: Yup.string().required(i18n._(t`Type is required`)),
      company_name: Yup.string().required(i18n._(t`Institution is required`)),
      city: Yup.string().required(i18n._(t`City is required`)),
      country: Yup.string().required(i18n._(t`Country is required`))
    })
  }

  handleSubmit = setParentFormFieldValue => (values, ...restParams) => {
    this.props.handleAddItem(setParentFormFieldValue)(
      {
        ...values,
        kind: values.kind.value || values.kind
      },
      ...restParams
    )
  }

  render() {
    const { setParentFormFieldValue } = this.props

    return (
      <Formik
        key={this.props.itemToEdit}
        initialValues={this.props.itemToEdit || this.initialValues()}
        onSubmit={this.handleSubmit(setParentFormFieldValue)}
        validationSchema={this.validationSchema()}
        render={formikProps => {
          return <WorkExperiences {...this.props} {...formikProps} />
        }}
      />
    )
  }
}

StudentProfileEditWorkExperiencesContainer.propTypes = {
  handleAddItem: PropTypes.func.isRequired,
  setParentFormFieldValue: PropTypes.func.isRequired
}

export default withI18n()(StudentProfileEditWorkExperiencesContainer)
