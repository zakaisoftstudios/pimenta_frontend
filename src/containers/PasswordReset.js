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
import * as PasswordResetAPI from '../services/api/passwordReset'
import sessionStorageItems from '../constants/sessionStorageItems'
import PasswordResetForm from '../atomic/molecules/PasswordResetForm'
import { Formik } from 'formik'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { compose } from 'redux'

class PasswordResetContainer extends React.Component {
  state = {
    redirectToReferrer: false,
    goToLogin: false,
    token: ''
  }

  async componentDidMount() {
    const tokenFromUrlParams = this.props.match.params.token
    this.setState({ token: tokenFromUrlParams })
  }

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      password: Yup.string()
        .min(6, i18n._(t`Passord must have at least 6 characters`))
        .required(i18n._(t`Password is required`)),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], i18n._(t`Passwords don't match`))
        .required(i18n._(t`Password confirmation is required`))
    })
  }

  initialValues = () => ({
    password: '',
    password_confirmation: ''
  })

  handlePasswordReset = async (values, { resetForm }) => {
    const { showPace, hidePace, showSnackNotification, i18n } = this.props

    showPace()

    const changed = await PasswordResetAPI.patch(
      values.password,
      values.password_confirmation,
      this.state.token
    )

    if (changed.error) {
      showSnackNotification({ message: changed.error })
      this.setState({ password: '', passwordConfirmation: '' })
    } else {
      const message = i18n._(t`Your password was updated`)
      showSnackNotification({ message })
      resetForm()
    }

    hidePace()
  }

  handleGoToLogin = () => this.setState({ goToLogin: true })

  formProps = props => ({
    empassword: '',
    passwordConfirmationail: ''
  })

  render() {
    const { goToLogin } = this.state

    return goToLogin ? (
      <Redirect to="/login" />
    ) : (
      <Formik
        initialValues={this.initialValues()}
        validationSchema={this.validationSchema()}
        onSubmit={this.handlePasswordReset}
        render={formikProps => (
          <PasswordResetForm
            {...formikProps}
            handleGoToLogin={this.handleGoToLogin}
          />
        )}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  showPace: () => dispatch(showPace()),
  hidePace: () => dispatch(hidePace()),
  showSnackNotification: payload => dispatch(showSnackNotification(payload))
})

export default compose(
  withI18n(),
  connect(
    null,
    mapDispatchToProps
  )
)(PasswordResetContainer)
