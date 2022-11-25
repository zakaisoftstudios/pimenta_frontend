import React from 'react'
import { Formik } from 'formik'
import * as SkillsAPI from '../../../../services/api/skills'
import * as StrengthsAPI from '../../../../services/api/strengths'
import * as InterestsAPI from '../../../../services/api/interests'
import * as JobOffersAPI from '../../../../services/api/jobOffers'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  showPace,
  hidePace,
  showSnackNotification
} from '../../../../actions/notification'
import JobForm from '../../../../atomic/organisms/JobForm'
import Loader from '../../../../atomic/atoms/Loader'
import MediaAttachmentsForm from '../../../../atomic/organisms/MediaAttachmentsForm'
import { usageTypes } from '../../../../services/attachments'
import * as JobOfferAttachmentsAPI from '../../../../services/api/jobOfferAttachments'
import { wagePeriodByValue } from '../../../../constants/wagePeriods'
import { getCategoryByValue } from '../../../../constants/jobOfferCategories'
import ActionModal from '../../../../atomic/molecules/ActionModal'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import uuid from 'uuid/v1'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import { Trans } from '@lingui/macro'
import { compose } from 'redux'

class CompanyJobsFormContainer extends React.Component {
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
    category: '',
    minimum_degree: '',
    state: 'published',
    content: '',
    what_is_expected_from_you: '',
    what_is_expected_from_us: '',
    perspectives: '',
    tasks: '',
    city: '',
    country: '',
    street: '',
    postal_code: '',
    latitude: '',
    longitude: '',
    start: '',
    end_date: '',
    duration: 1,
    wage: null,
    working_hours_per_week: null,
    free_places: 1,
    wage_period: '',
    web_site_link: '',
    skillsMustHave: [],
    skillsCanHave: [],
    interestsMustHave: [],
    interestsCanHave: [],
    strengthsMustHave: [],
    strengthsCanHave: [],
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
      content: Yup.string()
        .nullable()
        .trim()
        .required(i18n._(t`Content is required`)),
      category: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Role is required`)),
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
      start: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`))
        .required(i18n._(t`Starting date is required`)),
      end_date: Yup.date()
        .nullable()
        .typeError(i18n._(t`Invalid date. Format as mm/dd/yyyy.`)),
      wage: Yup.number()
        .nullable()
        .positive(i18n._(t`Wage must be positive`)),
      minimum_degree: Yup.string()
        .nullable()
        .required(i18n._(t`Minimum Degree is required`)),
      what_is_expected_from_us: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`What is expected from us is required`)),
      what_is_expected_from_you: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`What is expected from you is required`)),
      perspectives: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Perspectives is required`)),
      tasks: Yup.string()
        .trim()
        .nullable()
        .required(i18n._(t`Tasks is required`)),
      working_hours_per_week: Yup.number()
        .nullable()
        .min(1, i18n._(t`Minimum working hours per week is 1`))
        .max(50, i18n._(t`Maximum working hours per week are 50`)),
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
      initialValues = await JobOffersAPI.get(idFromUrlParams)
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

  handleUpdateBackendAttachment = attachment => {
    const jobOfferId = this.props.match.params.id

    if (attachment.id) {
      return JobOfferAttachmentsAPI.patch(attachment, jobOfferId)
    } else {
      return null
    }
  }

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

  handleSubmit = managedAttachments => async (values, { setSubmitting }) => {
    const { showPace, hidePace, showSnackNotification } = this.props
    const { editing } = this.state

    showPace()

    const {
      attachments,
      wage_period,
      category,
      minimum_degree,
      id,
      ...forPayload
    } = values

    const payload = {
      ...forPayload,
      minimum_degree: minimum_degree && minimum_degree.value,
      wage_period: wage_period && wage_period.value,
      category: category && category.value,
      attachments_attributes: managedAttachments
    }

    const res = editing
      ? await JobOffersAPI.patch(id, payload)
      : await JobOffersAPI.post(payload)

    hidePace()

    if (res.error) showSnackNotification({ message: res.error })
    else this.setState({ done: true })
  }

  render() {
    const {
      initialValues,
      ready,
      skills,
      strengths,
      interests,
      cancel,
      done,
      editing,
      showDirtyLeaveModal
    } = this.state

    return ready ? (
      <React.Fragment>
        {(cancel || done) && <Redirect to="/company/jobs" />}

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
          usageType={usageTypes.FOR_JOB}
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
                <JobForm
                  {...formikProps}
                  skills={skills}
                  strengths={strengths}
                  interests={interests}
                  editing={editing}
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
)(CompanyJobsFormContainer)
