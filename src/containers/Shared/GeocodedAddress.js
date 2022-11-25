import React from 'react'
import PropTypes from 'prop-types'
import { byPostalCode } from '../../services/geocode'
import GeocodedAddress from '../../components/UI/GeocodedAddress'

class GeocodedAddressContainer extends React.Component {
  state = {
    postalCode: '',
    city: '',
    country: '',
    latitude: null,
    longitude: null,
    error: null
  }

  componentDidMount() {
    this.setState({ ...this.props.initialValues })
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

  loadOptions = async (inputValue, callback) => {
    const results = await byPostalCode(inputValue)
    const resultsForSelect = results.map(result => ({
      label: `${result.city} - ${result.country}`,
      value: result
    }))

    callback(resultsForSelect)
  }

  handleAddressSelect = selectedAddress => {
    const {
      value: { city, country, latitude, longitude, postcode }
    } = selectedAddress

    this.setState(
      () => ({ city, country, latitude, longitude, postalCode: postcode }),
      () => this.updateForm()
    )
  }

  render() {
    const { postalCode, city, country, error } = this.state
    const { errors, touched } = this.props

    return (
      <GeocodedAddress
        postalCode={postalCode}
        city={city}
        country={country}
        error={error}
        handleInputChange={this.handleInputChange}
        handleAddressSelect={this.handleAddressSelect}
        errors={errors}
        touched={touched}
        loadOptions={this.loadOptions}
      />
    )
  }
}

GeocodedAddressContainer.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  initialValues: PropTypes.shape({
    postalCode: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string
  })
}

export default GeocodedAddressContainer
