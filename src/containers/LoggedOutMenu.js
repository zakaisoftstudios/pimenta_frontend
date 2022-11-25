import React from 'react'
import PropTypes from 'prop-types'
import LoggedOutMenu from '../components/Header/LoggedOutMenu'
import { connect } from 'react-redux'

const LoggedOutMenuContainer = ({ authenticated }) => (
  <LoggedOutMenu authenticated={authenticated} />
)

LoggedOutMenuContainer.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth: { authenticated } }) => ({
  authenticated
})

export default connect(
  mapStateToProps,
  null
)(LoggedOutMenuContainer)
