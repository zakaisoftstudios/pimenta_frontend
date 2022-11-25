import React from 'react'
import { errorFromFormik } from '../../services/util/form'
import PropTypes from 'prop-types'
import { Field } from 'formik'

const FormField = ({
  name,
  custom = false,
  component: Component,
  ...componentProps
}) => (
  <Field
    name={name}
    render={({
      field: { name, value, onChange, onBlur },
      form: { touched, errors, setFieldValue }
    }) => (
      <Component
        name={name}
        value={value}
        handleChange={custom ? value => setFieldValue(name, value) : onChange}
        handleBlur={onBlur}
        error={errorFromFormik(errors, touched, name)}
        {...componentProps}
      />
    )}
  />
)

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default FormField
