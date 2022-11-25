import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginSuccess } from '../actions/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as UsersAPI from '../services/api/users'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../actions/notification'
import { profileTypesList } from '../constants/profileTypes'
import RegistrationSuccess from '../atomic/molecules/RegistrationSuccess'
import RegisterForm from '../atomic/molecules/RegisterForm'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { compose } from 'redux'

class RegisterContainer extends React.Component {
  state = {
    successfulRegistration: false,
    homeUrl: '',
    apiError: '',
    acceptTerms: false,
    goToLogin: false,
    registerEmail: '',
    profileTypesList: profileTypesList().filter((profileType) => {
      if(profileType.backendResource != 'admin') return profileType;
    })
  }

  handleTermsChange = event =>
    this.setState({ acceptTerms: event.target.checked })

  handleRegister = async (values, { setSubmitting }) => {
    const { showPace, hidePace, showSnackNotification } = this.props

    showPace()

    const user = await UsersAPI.post(values)

    setSubmitting(false)
    hidePace()

    if (user.error) {
      showSnackNotification({ message: user.error })
    } else {
      this.setState({ successfulRegistration: true, registerEmail: user.email })
    }
  }

  formValidationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      profileType: Yup.string().required(i18n._(t`Profile type is required`)),
      name: Yup.string().required(i18n._(t`Name is required`)),
      email: Yup.string()
        .email(i18n._(t`Invalid email address`))
        .required(i18n._(t`Email is required`)),
      password: Yup.string()
        .min(6, i18n._(t`Passord must have at least 6 characters`))
        .required(i18n._(t`Password is required`)),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], i18n._(t`Passwords don't match`))
        .required(i18n._(t`Password confirmation is required`))
    })
  }

  formProps = props => ({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    acceptTerms: false,
    profileType: 'StudentProfile'
  })

  handleGoToLogin = () => this.setState({ goToLogin: true })

  render() {
    const {
      successfulRegistration,
      apiError,
      goToLogin,
      acceptTerms,
      registerEmail
    } = this.state
    const redirectUrlSuccess = `/register-success/${registerEmail}`

    if (successfulRegistration) return <Redirect to={redirectUrlSuccess} />
    if (goToLogin) return <Redirect to="/login" />

    return (
      <React.Fragment>
        <Formik
          initialValues={this.formProps()}
          validationSchema={this.formValidationSchema()}
          onSubmit={this.handleRegister}
          render={formikProps => (
            <RegisterForm
              {...formikProps}
              apiError={apiError}
              profileTypes={this.state.profileTypesList}
              handleTermsChange={this.handleTermsChange}
              acceptTerms={acceptTerms}
              handleGoToLogin={this.handleGoToLogin}
            />
          )}
        />
      </React.Fragment>
    )
  }
}

RegisterContainer.propTypes = {
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

export default withRouter(
  compose(
    withI18n(),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(RegisterContainer)
)
