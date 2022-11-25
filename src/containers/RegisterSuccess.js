import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginSuccess } from '../actions/auth'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../actions/notification'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import * as SendEmailConfirmationAPI from '../services/api/sendEmailConfirmation'
import sessionStorageItems from '../constants/sessionStorageItems'
import RegisterSuccessForm from '../atomic/molecules/RegisterSuccessForm';

class PasswordResetContainer extends React.Component {
  state = {
    redirectToReferrer: false,
    goToLogin: false,
    email: ''
  }

  async componentDidMount() {
    const emailFromUrlParams = this.props.match.params.email
    this.setState({email: emailFromUrlParams});
  }

  handleSendEmail = async e => {
    e.preventDefault()

    const { showSnackNotification } = this.props

    const { email } = this.state

    //TODO: implement post resend email
    const changed = await SendEmailConfirmationAPI.post(email)

    if (changed.error) {
      const message =
        changed.error.error === 404 ? 'invalid credentials' : changed.error
      showSnackNotification({ message })

      this.setState({ password: '', passwordConfirmation: '' })
    } else {
      sessionStorage.setItem(sessionStorageItems.userToken, changed.jwt)

      this.setState({
        redirectToReferrer: true
      })
    }
  }

  formProps = props => ({ email: '' })

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const {
      redirectToReferrer,
      email
    } = this.state

    return redirectToReferrer ? (
      <Redirect to={from} />
    ) : (
      <RegisterSuccessForm
        handleSendEmail={this.handleSendEmail}
        componentClicked={this.componentClicked}
        email={email}
      />
    )
  }
}

PasswordResetContainer.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth: { authenticated } }) => ({
  authenticated
})

const mapDispatchToProps = dispatch => ({
  loginSuccess: payload => dispatch(loginSuccess(payload)),
  showPace: () => dispatch(showPace()),
  hidePace: () => dispatch(hidePace()),
  showSnackNotification: payload => dispatch(showSnackNotification(payload))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetContainer)
