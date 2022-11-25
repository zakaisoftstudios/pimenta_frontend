import React from 'react'
import ForgotPasswordForm from '../atomic/molecules/ForgotPasswordForm'
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
import * as PasswordResetAPI from '../services/api/passwordReset'
import sessionStorageItems from '../constants/sessionStorageItems'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { compose } from 'redux'

class ForgotPasswordContainer extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    goToLogin: false
  }

  handleInputChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleForgotPassword = async e => {
    e.preventDefault()

    const { showPace, hidePace, showSnackNotification, i18n } = this.props

    showPace()
    const { email } = this.state

    const password = await PasswordResetAPI.post(email)

    if (password.error) {
      showSnackNotification({ message: password.error })

      this.setState({ email: '' })
    } else {
      const message = i18n._(
        t`We just sent you one email with the link to change your password`
      )
      showSnackNotification({ message })
      this.setState({ email: '' })
    }

    hidePace()
  }

  formValidationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      email: Yup.string()
        .email(i18n._(t`Invalid email address`))
        .required(i18n._(t`Email is required`))
    })
  }

  formProps = props => ({
    email: ''
  })

  handleGoToLogin = () => this.setState({ goToLogin: true })

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, email, goToLogin } = this.state

    if (goToLogin) return <Redirect to="/login" />

    return redirectToReferrer ? (
      <Redirect to={from} />
    ) : (
      <ForgotPasswordForm
        handleForgotPassword={this.handleForgotPassword}
        handleInputChange={this.handleInputChange}
        handleGoToLogin={this.handleGoToLogin}
        componentClicked={this.componentClicked}
        email={email}
      />
    )
  }
}

ForgotPasswordContainer.propTypes = {
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

export default compose(
  withI18n(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ForgotPasswordContainer)
