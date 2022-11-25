import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoginContainer from '../containers/Login'
import CurrentUser from '../components/CurrentUser'

class CurrentUserContainer extends React.Component {
  render() {
    const { authenticated, userName, userEmail } = this.props

    return (
      <React.Fragment>
        {authenticated ? (
          <CurrentUser userName={userName} userEmail={userEmail} />
        ) : (
          <LoginContainer />
        )}
      </React.Fragment>
    )
  }
}

CurrentUserContainer.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth }) => ({
  ...auth
})

export default connect(
  mapStateToProps,
  null
)(CurrentUserContainer)
