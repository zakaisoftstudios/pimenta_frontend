import React from 'react'
import PropTypes from 'prop-types'
import { byPostalCode } from '../services/geocode'
import GeocodedAddress from '../atomic/molecules/GeocodedAddress'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

const byPostaCodeDebounced = AwesomeDebouncePromise(byPostalCode, 300)

class GeocodedAddressContainer extends React.Component {
  state = {
    options: []
  }

  componentWillUnmount() {
    this.setState = () => {}
  }

  updateForm = () => {
    const { postalCode, city, country, latitude, longitude } = this.state
    const { setFieldValue } = this.props
    setFieldValue('postal_code', postalCode)
    setFieldValue('postalCode', postalCode)
    setFieldValue('city', city)
    setFieldValue('country', country)
    setFieldValue('latitude', latitude)
    setFieldValue('longitude', longitude)
  }

  loadOptions = async inputValue => {
    const searchResults = await byPostaCodeDebounced(inputValue)
    const options = searchResults.map(result => ({
      label: this.mountLabel(result),
      value: result
    }))

    this.setState({ options })
  }

  mountLabel = result =>
    `${result.postcode}, ${result.city} - ${result.country}`

  handleAddressSelect = selectedAddress => {
    const {
      value: { city, country, latitude, longitude, postcode }
    } = selectedAddress

    const { setFieldValue } = this.props
    setFieldValue('postal_code', postcode)
    setFieldValue('postalCode', postcode)
    setFieldValue('city', city)
    setFieldValue('country', country)
    setFieldValue('latitude', latitude)
    setFieldValue('longitude', longitude)
  }

  render() {
    return (
      <GeocodedAddress
        handleAddressSelect={this.handleAddressSelect}
        loadOptions={this.loadOptions}
        options={this.state.options}
      />
    )
  }
}

export default GeocodedAddressContainer
