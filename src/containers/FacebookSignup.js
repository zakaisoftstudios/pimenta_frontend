import React from 'react'
import FacebookSignup from '../atomic/organisms/FacebookSignup'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../actions/notification'
import { loginSuccess, loadCurrentUser } from '../actions/auth'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as FacebookTokenAPI from '../services/api/facebookToken'
import sessionStorageItems from '../constants/sessionStorageItems'
import { profileTypes } from '../constants/profileTypes'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class FacebookSignupContainer extends React.Component {
  state = {
    acceptTerms: false,
    cancel: false
  }

  handleTermsChange = event =>
    this.setState({ acceptTerms: event.target.checked })

  formValidationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      profileType: Yup.string().required(i18n._(t`Profile type is required`))
    })
  }

  formProps = props => ({
    profileType: 'StudentProfile'
  })

  handleRegister = async (values, { setSubmitting }) => {
    const {
      showPace,
      hidePace,
      showSnackNotification,
      loadCurrentUser
    } = this.props

    showPace()

    const auth = await FacebookTokenAPI.post(
      this.props.match.params.facebookToken,
      values.profileType
    )

    if (auth.error) {
      showSnackNotification({ message: auth.error })
    } else {
      sessionStorage.setItem(sessionStorageItems.userToken, auth.jwt)
      loadCurrentUser()
    }

    hidePace()
  }

  handleCancel = () => this.setState({ cancel: true })

  render() {
    const { acceptTerms, cancel } = this.state
    const { authenticated, profileType } = this.props

    if (authenticated)
      return <Redirect to={profileTypes[profileType].profileUrl} />

    if (cancel) return <Redirect to="/login" />

    return (
      <React.Fragment>
        <Formik
          initialValues={this.formProps()}
          validationSchema={this.formValidationSchema()}
          onSubmit={this.handleRegister}
          render={formikProps => (
            <FacebookSignup
              {...formikProps}
              handleTermsChange={this.handleTermsChange}
              acceptTerms={acceptTerms}
            />
          )}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth: { authenticated, profileType } }) => ({
  authenticated,
  profileType
})

const mapDispatchToProps = dispatch => ({
  loginSuccess: payload => dispatch(loginSuccess(payload)),
  showPace: () => dispatch(showPace()),
  hidePace: () => dispatch(hidePace()),
  showSnackNotification: payload => dispatch(showSnackNotification(payload)),
  loadCurrentUser: () => dispatch(loadCurrentUser())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FacebookSignupContainer)
)
