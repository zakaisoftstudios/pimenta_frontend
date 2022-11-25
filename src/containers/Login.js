import React from 'react'
import LoginForm from '../atomic/molecules/LoginForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { loginSuccess, loadCurrentUser } from '../actions/auth'
import {
  showPace,
  hidePace,
  updateChatNotificationsCount,
  showSnackNotification
} from '../actions/notification'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import * as UserTokenAPI from '../services/api/userToken'
import * as FacebookTokenAPI from '../services/api/facebookToken'
import * as CurrentUserAPI from '../services/api/currentUser'
import sessionStorageItems from '../constants/sessionStorageItems'
import { profileTypesList, profileTypes } from '../constants/profileTypes'
import { getAvatar } from '../services/attachments'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class LoginContainer extends React.Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    goToRegister: false,
    goToForgotPassword: false,
    goToFacebookSignup: false,
    facebookToken: ''
  }

  handleInputChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  responseFacebook = async response => {
    const {
      showPace,
      hidePace,
      loadCurrentUser,
      showSnackNotification,
      i18n
    } = this.props

    if (response !== undefined) {
      showPace()
      const auth = await FacebookTokenAPI.post(response.accessToken)

      if (auth.error) {
        if (auth.code === 404) {
          this.setState({
            goToFacebookSignup: true,
            facebookToken: response.accessToken
          })
        } else {
          const message = auth.error
          showSnackNotification({ message })

          this.setState({
            email: '',
            password: '',
          })
        }
      } else {
        sessionStorage.setItem(sessionStorageItems.userToken, auth.jwt)
        loadCurrentUser()
      }

      hidePace()
    } else {
      showSnackNotification({ message: i18n._(t`Login error`) })
    }
  }

  handleLogin = async e => {
    e.preventDefault()

    const {
      showPace,
      hidePace,
      loadCurrentUser,
      showSnackNotification,
      i18n
    } = this.props

    showPace()
    const { email, password } = this.state

    const auth = await UserTokenAPI.post(email, password)

    if (auth.error) {
      const notFoundMessage = i18n._(t`Invalid credentials`)
      const message = auth.error.error === 404 ? notFoundMessage : auth.error
      showSnackNotification({ message })

      this.setState({
        email: '',
        password: '',
      })
    } else {
      sessionStorage.setItem(sessionStorageItems.userToken, auth.jwt)
      loadCurrentUser()
    }

    hidePace()
  }

  formValidationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      profileType: Yup.string().required(i18n._(t`Profile type is required`)),
      email: Yup.string()
        .email(i18n._(t`Invalid email address`))
        .required(i18n._(t`Email is required`)),
      password: Yup.string().required(i18n._(t`Password is required`))
    })
  }

  formProps = props => ({
    email: '',
    password: '',
    profileType: 'StudentProfile'
  })

  handleGoToRegister = () => this.setState({ goToRegister: true })
  handleGoToForgotPassword = () => this.setState({ goToForgotPassword: true })

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { authenticated, profileType } = this.props
    const {
      redirectToReferrer,
      email,
      password,
      goToRegister,
      goToForgotPassword,
      goToFacebookSignup,
      facebookToken
    } = this.state

    if (authenticated)
      return <Redirect to={profileTypes[profileType].profileUrl} />

    if (goToRegister) return <Redirect to="/register" />
    if (goToForgotPassword) return <Redirect to="/forgot-password" />
    if (goToFacebookSignup)
      return <Redirect to={`/facebook-signup/${facebookToken}`} />

    return redirectToReferrer ? (
      <Redirect to={from} />
    ) : (
      <LoginForm
        handleLogin={this.handleLogin}
        handleInputChange={this.handleInputChange}
        handleGoToRegister={this.handleGoToRegister}
        handleGoToForgotPassword={this.handleGoToForgotPassword}
        handleTermsChange={this.handleTermsChange}
        responseFacebook={this.responseFacebook}
        componentClicked={this.componentClicked}
        email={email}
        password={password}
        profileTypes={profileTypesList()}
      />
    )
  }
}

LoginContainer.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  showPace: PropTypes.func.isRequired,
  hidePace: PropTypes.func.isRequired,
  updateChatNotificationsCount: PropTypes.func.isRequired,
  showSnackNotification: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  profileType: PropTypes.string.isRequired
}

const mapStateToProps = ({ auth: { authenticated, profileType } }) => ({
  authenticated,
  profileType
})

const mapDispatchToProps = dispatch => ({
  loginSuccess: payload => dispatch(loginSuccess(payload)),
  showPace: () => dispatch(showPace()),
  hidePace: () => dispatch(hidePace()),
  loadCurrentUser: () => dispatch(loadCurrentUser()),
  updateChatNotificationsCount: payload =>
    dispatch(updateChatNotificationsCount(payload)),
  showSnackNotification: payload => dispatch(showSnackNotification(payload))
})

export default compose(
  withI18n(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginContainer)
