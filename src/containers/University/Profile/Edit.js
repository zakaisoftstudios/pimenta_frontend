import React from 'react'
import PropTypes from 'prop-types'
import UniversityProfileForm from '../../../atomic/organisms/UniversityProfileForm'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../../../actions/notification'
import { updateProfileAvatar, setProfileComplete } from '../../../actions/auth'

import * as UniversityProfileAPI from '../../../services/api/universityProfile'
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

class UniversityProfileEditContainer extends React.Component {
  state = {
    redirectToProfile: false,
    apiError: '',
    pictureError: '',
    universityProfile: null,
    done: false,
    showWelcomeModal: false
  }

  async componentDidMount() {
    const universityProfile = await UniversityProfileAPI.get()

    this.setState({
      universityProfile,
      showWelcomeModal: !universityProfile.profile_complete
    })
  }

  handleSubmit = managedAttachments => async (values, { setSubmitting }) => {
    this.setState({ apiError: '' })

    const { showPace, hidePace, showSnackNotification } = this.props

    showPace()

    const profileAvatarSrc = getAvatar(managedAttachments).picture
    this.props.updateProfileAvatar(profileAvatarSrc)

    const { attachments, type_of_university, ...payload } = values

    const universityProfile = await UniversityProfileAPI.patch({
      ...payload,
      type_of_university: type_of_university.value,
      attachments_attributes: managedAttachments
    })

    setSubmitting(false)
    hidePace()

    if (universityProfile.error) {
      showSnackNotification({ message: universityProfile.error })
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
      name: Yup.string()
        .nullable()
        .required(i18n._(t`Name is required`)),
      type_of_university: Yup.string()
        .nullable()
        .required(i18n._(t`Type of University is required`)),
      number_of_students: Yup.number().nullable(),
      we_are: Yup.string()
        .nullable()
        .required(i18n._(t`We are is required`)),
      why_should_you_study_here: Yup.string()
        .nullable()
        .required(i18n._(t`Why should you study here is required`)),
      subject_areas: Yup.string()
        .nullable()
        .required(i18n._(t`Subject areas is required`)),
      special_features: Yup.string()
        .nullable()
        .required(i18n._(t`Special features is required`)),
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
      contact_email: Yup.string()
        .email(i18n._(t`Invalid email`))
        .nullable()
    })
  }

  render() {
    const {
      redirectToProfile,
      apiError,
      universityProfile,
      showImageUploader,
      showWelcomeModal,
      done,
      showDirtyLeaveModal
    } = this.state

    return universityProfile ? (
      <React.Fragment>
        {redirectToProfile && <Redirect to="/university/profile" />}

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
          initialItems={universityProfile.attachments}
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
              initialValues={universityProfile}
              validationSchema={this.validationSchema()}
              onSubmit={this.handleSubmit(getAttachmentsForSubmit())}
              render={formikProps => {
                return (
                  <UniversityProfileForm
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

UniversityProfileEditContainer.propTypes = {
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
)(UniversityProfileEditContainer)
