import React from 'react'
import PropTypes from 'prop-types'
import CompanyProfileForm from '../../../atomic/organisms/CompanyProfileForm'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../../../actions/notification'
import { updateProfileAvatar, setProfileComplete } from '../../../actions/auth'

import * as CompanyProfileAPI from '../../../services/api/companyProfile'
import * as AttachmentsAPI from '../../../services/api/profileAttachments'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import MediaAttachmentsForm from '../../../atomic/organisms/MediaAttachmentsForm'
import Loader from '../../../atomic/atoms/Loader'
import { getAvatar, usageTypes } from '../../../services/attachments'
import _ from 'lodash'
import { WelcomeModal } from '../../../atomic/molecules/WelcomeModal'
import ActionModal from '../../../atomic/molecules/ActionModal'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { compose } from 'redux'

class CompanyProfileEditContainer extends React.Component {
  state = {
    redirectToProfile: false,
    showDirtyLeaveModal: false,
    apiError: '',
    pictureError: '',
    companyProfile: null,
    done: false,
    showWelcomeModal: false
  }

  async componentDidMount() {
    const companyProfile = await CompanyProfileAPI.get()

    this.setState({
      companyProfile,
      showWelcomeModal: !companyProfile.profile_complete
    })
  }

  handleSubmit = managedAttachments => async (values, { setSubmitting }) => {
    this.setState({ apiError: '' })

    const { showPace, hidePace, showSnackNotification } = this.props

    showPace()

    const profileAvatarSrc = getAvatar(managedAttachments).picture
    this.props.updateProfileAvatar(profileAvatarSrc)

    const { attachments, ...payload } = values

    const companyProfile = await CompanyProfileAPI.patch({
      ...payload,
      attachments_attributes: managedAttachments
    })

    setSubmitting(false)
    hidePace()

    if (companyProfile.error) {
      showSnackNotification({ message: companyProfile.error })
    } else {
      this.props.setProfileComplete()
      this.setState({ done: true, redirectToProfile: true })
    }
  }

  handleCancel = dirty => () => {
    if (dirty) {
      this.setState({ showDirtyLeaveModal: true })
    } else {
      this.setState({ redirectToProfile: true })
    }
  }

  handleCancelDirtyLeave = () => this.setState({ showDirtyLeaveModal: false })

  handleConfirmDirtyLeave = () => this.setState({ redirectToProfile: true })

  handleUpdateBackendAttachment = attachment => AttachmentsAPI.patch(attachment)

  handleCloseWelcomeModal = () => this.setState({ showWelcomeModal: false })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      name: Yup.string().required(i18n._(t`Name is required`)),
      contact_person: Yup.string().nullable(),
      contact_email: Yup.string()
        .email(i18n._(t`Invalid email`))
        .nullable(),
      city: Yup.string()
        .nullable()
        .required(i18n._(t`City is required`)),
      country: Yup.string()
        .nullable()
        .required(i18n._(t`Country is required`)),
      postal_code: Yup.string()
        .nullable()
        .required(i18n._(t`Postal Code is required`)),
      street: Yup.string()
        .nullable()
        .required(i18n._(t`Address (street and number) is required`)),
      industry_sector: Yup.string()
        .nullable()
        .required(i18n._(t`Industry sector is required`)),
      number_of_employees: Yup.number()
        .nullable()
        .positive(i18n._(t`Number of employees must be positive`))
        .required(i18n._(t`Number of employees is required`)),
      what_we_do: Yup.string()
        .nullable()
        .required(i18n._(t`What we do is required`)),
      why_we_do_it: Yup.string()
        .nullable()
        .required(i18n._(t`Why we do it is required`)),
      why_you_should_join_our_team: Yup.string()
        .nullable()
        .required(i18n._(t`Why you should join is required`)),
      home_page: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`)),
      facebok_link: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`)),
      youtube_link: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`)),
      twitter_link: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`)),
      instagram_link: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`))
    })
  }

  render() {
    const {
      redirectToProfile,
      apiError,
      companyProfile,
      showImageUploader,
      showWelcomeModal,
      done,
      showDirtyLeaveModal
    } = this.state

    return companyProfile ? (
      <React.Fragment>
        {redirectToProfile && <Redirect to="/company/profile" />}

        {showWelcomeModal && (
          <WelcomeModal handleClose={this.handleCloseWelcomeModal} />
        )}

        {showDirtyLeaveModal && (
          <ActionModal
            handleClose={this.handleCancelDirtyLeave}
            content={
              <Trans>
                You are leaving the page without saving and will lose all
                changed data.
              </Trans>
            }
            actions={[
              {
                name: <Trans>Leave</Trans>,
                handler: this.handleConfirmDirtyLeave
              }
            ]}
          />
        )}

        <MediaAttachmentsForm
          usageType={usageTypes.FOR_PROFILE}
          initialItems={companyProfile.attachments}
          handleUpdateBackendAttachment={this.handleUpdateBackendAttachment}
        >
          {({
            attachments,
            getAttachmentsForSubmit,
            handleShowImageUploader,
            handleDeleteAttachment,
            handleShowVideoUploader
          }) => (
            <Formik
              initialValues={companyProfile}
              validationSchema={this.validationSchema()}
              onSubmit={this.handleSubmit(getAttachmentsForSubmit())}
              render={formikProps => {
                return (
                  <CompanyProfileForm
                    {...formikProps}
                    apiError={apiError}
                    handleCancel={this.handleCancel}
                    attachments={attachments}
                    handleShowImageUploader={handleShowImageUploader}
                    handleShowVideoUploader={handleShowVideoUploader}
                    handleDeleteAttachment={handleDeleteAttachment}
                    done={done}
                  />
                )
              }}
            />
          )}
        </MediaAttachmentsForm>
      </React.Fragment>
    ) : (
      <Loader />
    )
  }
}

CompanyProfileEditContainer.propTypes = {
  showPace: PropTypes.func.isRequired,
  hidePace: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  showPace: () => dispatch(showPace()),
  hidePace: () => dispatch(hidePace()),
  showSnackNotification: payload => dispatch(showSnackNotification(payload)),
  updateProfileAvatar: payload => dispatch(updateProfileAvatar(payload)),
  setProfileComplete: () => dispatch(setProfileComplete())
})

export default compose(
  withI18n(),
  connect(
    null,
    mapDispatchToProps
  )
)(CompanyProfileEditContainer)
