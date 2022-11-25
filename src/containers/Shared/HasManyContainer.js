import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'

class HasManyContainer extends React.Component {
  state = {
    items: [],
    newItems: [],
    showNewForm: false,
    fieldName: ''
  }

  componentDidMount() {
    const { items, fieldName } = this.props
    this.setState({ items, fieldName })
  }

  updateParentForm = setParentFormFieldValue => {
    const { items, newItems, fieldName } = this.state

    const normalizedNewItems = newItems.map(newItem => {
      const { id, _new, ...rest } = newItem
      return { ...rest }
    })

    const allItems = [...items, ...normalizedNewItems]

    setParentFormFieldValue(fieldName, allItems)
  }

  handleRemoveItem = (id, setParentFormFieldValue) => () => {
    const { items } = this.state

    const toRemove = items.find(item => item.id === id)
    const itemWithDestroy = { ...toRemove, _destroy: true }
    const unmodifiedItems = items.filter(item => item.id !== id)

    this.setState(
      () => ({
        items: [...unmodifiedItems, itemWithDestroy]
      }),
      () => this.updateParentForm(setParentFormFieldValue)
    )
  }

  handleRemoveNewItem = (removeindex, setParentFormFieldValue) => () => {
    const { newItems } = this.state
    const filteredItems = newItems.filter((_, index) => index !== removeindex)

    this.setState(
      () => ({ newItems: filteredItems }),
      () => this.updateParentForm(setParentFormFieldValue)
    )
  }

  handleAddItem = setParentFormFieldValue => (values, { resetForm }) => {
    this.state.itemToEdit
      ? this.updateItem(values, setParentFormFieldValue)
      : this.addItem(values, setParentFormFieldValue)
    resetForm()
  }

  addItem = (values, setParentFormFieldValue) => {
    const newItem = { ...values, _new: true, id: uuid() }
    const newItems = [...this.state.newItems, newItem]

    this.setState(
      () => ({
        newItems,
        showNewForm: false
      }),
      () => this.updateParentForm(setParentFormFieldValue)
    )
  }

  updateItem = (values, setParentFormFieldValue) => {
    const originalItemsKey = values._new ? 'newItems' : 'items'

    const unmodifiedItems = this.state[originalItemsKey].filter(
      item => item.id !== values.id
    )

    const updatedItems = [...unmodifiedItems, values]

    this.setState(
      () => ({
        [originalItemsKey]: updatedItems,
        showNewForm: false,
        itemToEdit: null
      }),
      () => this.updateParentForm(setParentFormFieldValue)
    )
  }

  handleEditItem = itemToEdit => () =>
    this.setState({ itemToEdit, showNewForm: true })

  handleClearNewForm = handleReset => () => {
    handleReset()
    this.setState({ showNewForm: false, itemToEdit: null })
  }

  handleToggleNewForm = () => {
    const { showNewForm } = this.state

    this.setState({
      showNewForm: !showNewForm
    })
  }

  undestroyedItems = () =>
    this.state.items.filter(item => !item.hasOwnProperty('_destroy'))

  render() {
    const props = {
      ...this.state,
      undestroyedItems: this.undestroyedItems(),
      handleRemoveItem: this.handleRemoveItem,
      handleRemoveNewItem: this.handleRemoveNewItem,
      handleAddItem: this.handleAddItem,
      handleClearNewForm: this.handleClearNewForm,
      handleToggleNewForm: this.handleToggleNewForm,
      handleEditItem: this.handleEditItem
    }

    return this.props.render(props)
  }
}

HasManyContainer.propTypes = {
  items: PropTypes.array.isRequired,
  fieldName: PropTypes.string.isRequired
}

export default HasManyContainer
