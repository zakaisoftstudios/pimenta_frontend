import React from 'react'
import * as SubjectOffersAPI from '../../../services/api/subjectOffers'
import { Formik } from 'formik'
import SubjectForm from '../../../atomic/organisms/SubjectForm'
import ActionModal from '../../../atomic/molecules/ActionModal'
import { usageTypes } from '../../../services/attachments'
import uuid from 'uuid/v1'
import * as Yup from 'yup'
import MediaAttachmentsForm from '../../../atomic/organisms/MediaAttachmentsForm'
import Loader from '../../../atomic/atoms/Loader'
import dayjs from 'dayjs'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../../../actions/notification'
import * as SkillsAPI from '../../../services/api/skills'
import * as InterestsAPI from '../../../services/api/interests'
import * as StrengthsAPI from '../../../services/api/strengths'
import * as SubjectOfferAttachmentsAPI from '../../../services/api/subjectOfferAttachments'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { compose } from 'redux'
import { Trans } from '@lingui/macro'

class UniversitySubjectsFormContainer extends React.Component {
  state = {
    ready: false,
    cancel: false,
    done: false,
    showDirtyLeaveModal: false,
    initialValues: null,
    editing: false,
    skills: [],
    interests: [],
    strengths: []
  }

  initialValues = () => ({
    state: 'published',
    name: '',
    type_of_degree: null,
    city: '',
    country: '',
    street: '',
    postal_code: '',
    latitude: '',
    longitude: '',
    start_date: dayjs(),
    start_dates: [],
    duration_in_hours: null,
    cost_period: null,
    cost_amount: null,
    hours_of_classes_per_week: null,
    number_of_places: null,
    nummerus_clausus: null,
    minimum_degree: null,
    content: '',
    perspectives: '',
    tests: '',
    web_site_link: '',
    subject_offer_skills: [],
    subject_offer_interests: [],
    subject_offer_strengths: [],
    attachments: [
      {
        id: uuid(),
        picture_url: null,
        purpose: 'main',
        _new: true
      },
      {
        id: uuid(),
        picture_url: null,
        purpose: 'regular',
        _new: true
      },
      {
        id: uuid(),
        picture_url: null,
        purpose: 'regular',
        _new: true
      },
      {
        id: uuid(),
        picture_url: null,
        purpose: 'regular',
        _new: true
      },
      {
        id: uuid(),
        video_url: null,
        purpose: 'video',
        _new: true
      }
    ]
  })

  validationSchema = () => {
    const { i18n } = this.props

    return Yup.object().shape({
      state: Yup.string()
        .nullable()
        .trim()
        .required(i18n._(t`State is required`)),
      name: Yup.string()
        .nullable()
        .trim()
        .required(i18n._(t`Name of the class is required`)),
      type_of_degree: Yup.string()
        .nullable()
        .trim()
        .required(i18n._(t`Type of degree is required`)),
      city: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`City is required`)),
      country: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Country is required`)),
      street: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Address (street and number) is required`)),
      postal_code: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Zip Code is required`)),
      start_date: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
        .required(i18n._(t`Starting date is required`)),
      duration_in_hours: Yup.number()
        .nullable()
        .required(i18n._(t`Duration is required`)),
      hours_of_classes_per_week: Yup.number().nullable(),
      number_of_places: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min 1 place`)),
      cost_amount: Yup.number()
        .nullable()
        .min(1, i18n._(t`Min cost of 0`)),
      nummerus_clausus: Yup.number()
        .nullable()
        .max(15, i18n._(t`Max 15`)),
      minimum_degree: Yup.string()
        .nullable()
        .required(i18n._(t`Minimum Degree is required`)),
      content: Yup.string()
        .nullable()
        .required(i18n._(t`Content is required`)),
      perspectives: Yup.string()
        .nullable()
        .required(i18n._(t`Perspectives are required`)),
      tests: Yup.string()
        .nullable()
        .required(i18n._(t`Tests are required`)),
      skillsMustHave: Yup.array()
        .min(1, i18n._(t`Pick up at least one`))
        .max(5, i18n._(t`Pick up maximum five`)),
      skillsCanHave: Yup.array().max(5, i18n._(t`Pick up five at most`)),
      interestsCanHave: Yup.array().max(5, i18n._(t`Pick up five at most`)),
      interestsMustHave: Yup.array()
        .min(1, i18n._(t`Pick up at least one`))
        .max(5, i18n._(t`Pick up maximum five`)),
      strengthsMustHave: Yup.array()
        .min(1, i18n._(t`Pick up at least one`))
        .max(5, i18n._(t`Pick up maximum five`)),
      strengthsCanHave: Yup.array().max(5, i18n._(t`Pick up five at most`)),
      web_site_link: Yup.string()
        .nullable()
        .url(i18n._(t`Invalid URL (e.g., https://google.com)`))
    })
  }

  async componentDidMount() {
    const idFromUrlParams = this.props.match.params.id
    let editing = false
    let initialValues = null

    const skills = await SkillsAPI.getAll()
    const interests = await InterestsAPI.getAll()
    const strengths = await StrengthsAPI.getAll()

    if (idFromUrlParams) {
      editing = true
      initialValues = await SubjectOffersAPI.get(idFromUrlParams)
    } else {
      initialValues = this.initialValues()
    }

    this.setState({
      initialValues,
      ready: true,
      editing,
      skills,
      interests,
      strengths
    })
  }

  handleUpdateBackendAttachment = attachment =>
    attachment.id
      ? SubjectOfferAttachmentsAPI.patch(
          attachment,
          this.state.initialValues.id
        )
      : null

  handleCancel = dirty => () => {
    if (dirty) {
      this.setState({ showDirtyLeaveModal: true })
    } else {
      this.setState({ cancel: true })
    }
  }

  handleCancelDirtyLeave = () => this.setState({ showDirtyLeaveModal: false })

  handleConfirmDirtyLeave = () => this.setState({ cancel: true })

  handleCancelDirtyLeave = () => this.setState({ showDirtyLeaveModal: false })

  handleSubmit = managedAttachments => async values => {
    const { showPace, hidePace, showSnackNotification } = this.props
    const { editing } = this.state

    showPace()

    const {
      attachments,
      minimum_degree,
      type_of_degree,
      cost_period,
      subject_offer_skills,
      id,
      ...forPayload
    } = values

    const payload = {
      ...forPayload,
      minimum_degree: minimum_degree && minimum_degree.value,
      type_of_degree: type_of_degree && type_of_degree.value,
      cost_period: cost_period && cost_period.value,
      attachments_attributes: managedAttachments
    }

    const res = editing
      ? await SubjectOffersAPI.patch(id, payload)
      : await SubjectOffersAPI.post(payload)

    hidePace()

    if (res.error) showSnackNotification({ message: res.error })
    else this.setState({ done: true })
  }

  render() {
    const {
      initialValues,
      ready,
      cancel,
      done,
      editing,
      showDirtyLeaveModal,
      skills,
      interests,
      strengths
    } = this.state

    return ready ? (
      <React.Fragment>
        {(cancel || done) && <Redirect to="/university/subject-offers" />}

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
          usageType={usageTypes.FOR_SUBJECT}
          initialItems={initialValues.attachments}
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
              initialValues={initialValues}
              onSubmit={this.handleSubmit(getAttachmentsForSubmit())}
              validationSchema={this.validationSchema()}
              render={formikProps => (
                <SubjectForm
                  {...formikProps}
                  skills={skills}
                  strengths={strengths}
                  interests={interests}
                  handleCancel={this.handleCancel}
                  attachments={attachments}
                  handleShowImageUploader={handleShowImageUploader}
                  handleShowVideoUploader={handleShowVideoUploader}
                  handleDeleteAttachment={handleDeleteAttachment}
                  done={done}
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
  showSnackNotification: payload => dispatch(showSnackNotification(payload))
})

export default compose(
  withI18n(),
  connect(
    null,
    mapDispatchToProps
  )
)(UniversitySubjectsFormContainer)
