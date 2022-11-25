import React from 'react'
import StudentProfileForm from '../../../../atomic/organisms/StudentProfileForm'
import * as StudentProfileAPI from '../../../../services/api/studentProfile'
import * as SkillsAPI from '../../../../services/api/skills'
import * as InterestsAPI from '../../../../services/api/interests'
import * as StrengthsAPI from '../../../../services/api/strengths'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../../../../actions/notification'
import MediaAttachmentsForm from '../../../../atomic/organisms/MediaAttachmentsForm'
import * as AttachmentsAPI from '../../../../services/api/profileAttachments'
import Loader from '../../../../atomic/atoms/Loader'
import { getAvatar, usageTypes } from '../../../../services/attachments'
import {
  updateProfileAvatar,
  setProfileComplete
} from '../../../../actions/auth'
import { WelcomeModal } from '../../../../atomic/molecules/WelcomeModal'
import ActionModal from '../../../../atomic/molecules/ActionModal'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { compose } from 'redux'

class StudentProfileEditContainer extends React.Component {
  state = {
    redirectToProfile: false,
    done: false,
    redirectToProfile: false,
    ready: false,
    apiError: '',
    profile: null,
    skills: [],
    interests: [],
    strengths: [],
    showWelcomeModal: false,
    showDirtyLeaveModal: false
  }

  async componentDidMount() {
    const profile = await StudentProfileAPI.get()
    const skills = await SkillsAPI.getAll()
    const interests = await InterestsAPI.getAll()
    const strengths = await StrengthsAPI.getAll()

    this.setState({
      profile: { ...profile },
      skills,
      interests,
      strengths,
      ready: true,
      showWelcomeModal: !profile.profile_complete
    })
  }

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      name: Yup.string().required(i18n._(t`Name is required`)),
      gender: Yup.string()
        .nullable()
        .required(i18n._(t`Gender is required`)),
      current_job_status: Yup.string()
        .nullable()
        .required(i18n._(t`Current job status is required`)),
      highest_graduation_level: Yup.string()
        .nullable()
        .required(i18n._(t`Highest graduation level is required`)),
      country: Yup.string()
        .nullable()
        .required(i18n._(t`Country is required`)),
      city: Yup.string()
        .nullable()
        .required(i18n._(t`City is required`)),
      postal_code: Yup.string()
        .nullable()
        .required(i18n._(t`Postal Code is required`)),
      street: Yup.string()
        .nullable()
        .required(i18n._(t`Street is required`)),
      graduation: Yup.string()
        .nullable()
        .required(i18n._(t`Graduation is required`)),
      mobility: Yup.string()
        .nullable()
        .required(i18n._(t`Mobility is required`)),
      driving_license: Yup.string()
        .nullable()
        .required(i18n._(t`Has driver license is required`)),
      grade_point_average: Yup.number()
        .nullable()
        .max(100, i18n._(t`Max grade of 100`))
        .min(0, i18n._(t`Min grade of 0`))
        .required(i18n._(t`Grade point average is required`)),
      date_of_birth: Yup.date()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
        .nullable()
        .required(i18n._(t`Birthday is required`)),
      available_from: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
        .required(i18n._(t`Available from is required`)),
      student_profile_skills_attributes: Yup.array().test(
        'min',
        i18n._(t`Choose at least 1 skill`),
        this.qualityArrayInvalid
      ),
      student_profile_interests_attributes: Yup.array().test(
        'min',
        i18n._(t`Choose at least 1 interest`),
        this.qualityArrayInvalid
      ),
      student_profile_strengths_attributes: Yup.array().test(
        'min',
        i18n._(t`Choose at least 1 strength`),
        this.qualityArrayInvalid
      )
    })
  }

  qualityArrayInvalid = items =>
    !(items.filter(item => !item._destroy).length === 0)

  initialValues = () => {
    const {
      student_profile_skills,
      student_profile_interests,
      student_profile_strengths,
      ...rest
    } = this.state.profile

    return {
      ...rest,
      student_profile_skills_attributes: student_profile_skills,
      student_profile_interests_attributes: student_profile_interests,
      student_profile_strengths_attributes: student_profile_strengths
    }
  }

  handleUpdateBackendAttachment = attachment => AttachmentsAPI.patch(attachment)

  handleSubmit = managedAttachments => async (values, { setSubmitting }) => {
    const { showPace, hidePace, showSnackNotification } = this.props
    showPace()

    this.setState({ apiError: '' })

    const profileAvatarSrc = getAvatar(managedAttachments).picture
    this.props.updateProfileAvatar(profileAvatarSrc)

    const {
      id,
      certificates,
      education_entries,
      work_experiences,
      student_profile_skills,
      student_profile_interests,
      current_job_status,
      highest_graduation_level,
      attachments,
      ...payload
    } = values

    const res = await StudentProfileAPI.patch({
      ...payload,
      attachments_attributes: managedAttachments,
      highest_graduation_level: highest_graduation_level.value,
      certificates_attributes: certificates,
      education_entries_attributes: education_entries,
      work_experiences_attributes: work_experiences,
      current_job_status: current_job_status && current_job_status.value
    })

    setSubmitting(false)
    hidePace()

    if (res.error) {
      showSnackNotification({ message: res.error })
      this.setState({ apiError: res.error })
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

  handleCloseWelcomeModal = () => this.setState({ showWelcomeModal: false })

  handleUpdateBackendAttachment = attachment => AttachmentsAPI.patch(attachment)

  render() {
    const {
      profile,
      done,
      redirectToProfile,
      ready,
      apiError,
      skills,
      interests,
      strengths,
      showWelcomeModal,
      showDirtyLeaveModal
    } = this.state

    return ready ? (
      <React.Fragment>
        {redirectToProfile && <Redirect to="/student/profile" />}

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
          initialItems={profile.attachments}
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
              initialValues={this.initialValues()}
              validationSchema={this.validationSchema()}
              onSubmit={this.handleSubmit(getAttachmentsForSubmit())}
              render={formikProps => (
                <StudentProfileForm
                  apiError={apiError}
                  skills={skills}
                  interests={interests}
                  strengths={strengths}
                  profile={profile}
                  {...formikProps}
                  attachments={attachments}
                  handleShowImageUploader={handleShowImageUploader}
                  handleShowVideoUploader={handleShowVideoUploader}
                  handleDeleteAttachment={handleDeleteAttachment}
                  handleCancel={this.handleCancel}
                  done={done}
                  shake={false}
                />
              )}
            />
          )}
        </MediaAttachmentsForm>
      </React.Fragment>
    ) : (
      <Loader />
    )
  }
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
)(StudentProfileEditContainer)
