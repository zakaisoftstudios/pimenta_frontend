import React from 'react'
import PropTypes from 'prop-types'
import EditEducationEntries from '../../../../atomic/organisms/EditEducationEntries'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class StudentProfileEditEducationEntriesContainer extends React.Component {
  initialValues = () => ({
    from: '',
    to: '',
    city: '',
    country: '',
    grade_point_average: '',
    school_name: '',
    educational_level: '',
    area_of_graduation: '',
    selected_educational_level: null
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
      school_name: Yup.string().required(i18n._(t`School name is required`)),
      city: Yup.string().required(i18n._(t`City is required`)),
      country: Yup.string().required(i18n._(t`Country is required`)),
      educational_level: Yup.string().required(
        i18n._(t`Educational level is required`)
      ),
      grade_point_average: Yup.number()
        .required(i18n._(t`Grade point average is required`))
        .max(100, i18n._(t`Max grade of 100`))
        .min(0, i18n._(t`Min grade of 0`))
    })
  }

  handleSubmit = setParentFormFieldValue => (values, ...restParams) => {
    this.props.handleAddItem(setParentFormFieldValue)(
      {
        ...values,
        educational_level:
          values.educational_level.value || values.educational_level
      },
      ...restParams
    )
  }

  render() {
    const {
      undestroyedItems,
      showNewForm,
      newItems,
      handleRemoveItem,
      handleRemoveNewItem,
      handleClearNewForm,
      handleToggleNewForm,
      setParentFormFieldValue,
      handleEditItem,
      itemToEdit
    } = this.props

    return (
      <Formik
        key={itemToEdit}
        initialValues={this.props.itemToEdit || this.initialValues()}
        onSubmit={this.handleSubmit(setParentFormFieldValue)}
        validationSchema={this.validationSchema()}
        render={formikProps => {
          return (
            <EditEducationEntries
              undestroyedEntries={undestroyedItems}
              handleRemoveEducation={handleRemoveItem}
              handleRemoveNewEducation={handleRemoveNewItem}
              handleToggleNewForm={handleToggleNewForm}
              showNewForm={showNewForm}
              newEducationEntries={newItems}
              handleClearAddEducation={handleClearNewForm}
              setParentFormFieldValue={setParentFormFieldValue}
              handleEditEducation={handleEditItem}
              itemToEdit={itemToEdit}
              {...formikProps}
            />
          )
        }}
      />
    )
  }
}

StudentProfileEditEducationEntriesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  newItems: PropTypes.array.isRequired,
  undestroyedItems: PropTypes.array.isRequired,
  showNewForm: PropTypes.bool.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
  handleRemoveNewItem: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleClearNewForm: PropTypes.func.isRequired,
  handleToggleNewForm: PropTypes.func.isRequired
}

export default withI18n()(StudentProfileEditEducationEntriesContainer)
