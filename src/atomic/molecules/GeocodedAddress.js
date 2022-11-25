import React from 'react'
import Input from '../atoms/Input'
import SelectSimple from '../atoms/SelectSimple'
import FormRow from '../atoms/FormRow'
import FormField from '../molecules/FormField'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const GeocodedAddress = ({
  loadOptions,
  options,
  handleAddressSelect,
  i18n
}) => (
  <React.Fragment>
    <FormRow>
      <SelectSimple
        name="zipcode_search"
        label={i18n._(t`Type a zip code to search`)}
        placeholder=""
        options={options}
        handleInputChange={loadOptions}
        handleChange={handleAddressSelect}
        autocomplete="off"
      />
    </FormRow>
  </React.Fragment>
)

export default withI18n()(GeocodedAddress)
