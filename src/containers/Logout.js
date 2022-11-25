import React from 'react'
import Logout from '../atomic/atoms/Logout'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutSuccess } from '../actions/auth'
import PropTypes from 'prop-types'
import sessionStorageItems from '../constants/sessionStorageItems'

class LogoutContainer extends React.Component {
  state = {
    redirectToLogin: false
  }

  handleLogout = () => {
    sessionStorage.removeItem(sessionStorageItems.randomAvatarId)
    sessionStorage.removeItem(sessionStorageItems.userToken)
    this.props.logoutSuccess()

    this.setState({
      redirectToLogin: true
    })
  }

  render() {
    const { redirectToLogin } = this.state

    return (
      <React.Fragment>
        {redirectToLogin ? (
          <Redirect to="/login" />
        ) : (
          <Logout handleLogout={this.handleLogout} />
        )}
      </React.Fragment>
    )
  }
}

LogoutContainer.propTypes = {
  logoutSuccess: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  logoutSuccess: () => dispatch(logoutSuccess())
})

export default connect(
  null,
  mapDispatchToProps
)(LogoutContainer)
