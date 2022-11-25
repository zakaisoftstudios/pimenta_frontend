import React from 'react'
import PropTypes from 'prop-types'
import { debug } from 'util'

class CheckboxHasManyContainer extends React.Component {
  state = {
    options: [],
    selectedOptionsIds: []
  }

  componentDidMount() {
    this.setState({
      selectedOptionsIds: this.initialValuesOptionIds(),
      options: this.normalizeOptionsIds()
    })
  }

  normalizeOptionsIds = () =>
    this.props.options.map(option => ({
      label: option.label,
      id: option.id.toString()
    }))

  initialValuesOptionIds = () => {
    const { initialValues, optionItemName } = this.props
    return initialValues.map(value => value[optionItemName].id.toString())
  }

  isChecked = id => this.state.selectedOptionsIds.includes(id)

  updateFormValue = () => {
    const {
      setFieldValue,
      fieldName,
      optionItemName,
      initialValues,
      ownerId,
      ownerName,
      additionalFields
    } = this.props

    const { selectedOptionsIds } = this.state

    const toDestroy = initialValues
      .filter(
        initialValue =>
          !selectedOptionsIds.includes(
            initialValue[optionItemName].id.toString()
          )
      )
      .map(toDestroy => ({
        id: toDestroy.id,
        _destroy: true,
        ...additionalFields
      }))

    const toDestroyIds = toDestroy.map(toDestroy => toDestroy.id)
    const toKeep = initialValues.filter(
      initialValue => !toDestroyIds.includes(initialValue.id)
    )

    const toAdd = selectedOptionsIds
      .filter(
        selectedOptionId =>
          !this.initialValuesOptionIds().includes(selectedOptionId)
      )
      .map(selectedOptionId => ({
        [`${optionItemName}_id`]: selectedOptionId,
        [`${ownerName}_id`]: ownerId,
        ...additionalFields
      }))

    setFieldValue(fieldName, [...toDestroy, ...toAdd, ...toKeep])
  }

  handleCheckboxChange = event => {
    const { selectedOptionsIds } = this.state
    const { limit, setFieldTouched, fieldName } = this.props

    setFieldTouched(fieldName)

    if (limit && event.target.checked && selectedOptionsIds.length >= limit) {
      event.preventDefault()
      return
    }

    const optionId = event.target.value

    const newSelectedOptionsIds = event.target.checked
      ? [...selectedOptionsIds, optionId]
      : [...selectedOptionsIds.filter(id => id !== optionId)]

    this.setState(
      () => ({
        selectedOptionsIds: newSelectedOptionsIds
      }),
      () => this.updateFormValue()
    )
  }

  getSelectedItemsAsString = itemToString =>
    this.state.options
      .filter(option => this.state.selectedOptionsIds.includes(option.id))
      .map(option => itemToString(option))
      .join(', ')

  render() {
    const { selectedOptionsIds, options } = this.state

    const props = {
      options,
      selectedOptionsIds,
      isChecked: this.isChecked,
      handleChange: this.handleCheckboxChange,
      getSelectedItemsAsString: this.getSelectedItemsAsString
    }

    return this.props.render(props)
  }
}

CheckboxHasManyContainer.propTypes = {
  options: PropTypes.array.isRequired,
  initialValues: PropTypes.array.isRequired,
  optionItemName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerId: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
}

export default CheckboxHasManyContainer
