import React from 'react'
import PropTypes from 'prop-types'

const WithContext = ({ context: Context, component: Component, ...rest }) => (
  <Context.Consumer>
    {contextProps => <Component {...contextProps} {...rest} />}
  </Context.Consumer>
)

WithContext.propTypes = {
  context: PropTypes.object.isRequired,
  component: PropTypes.func.isRequired
}

export default WithContext
