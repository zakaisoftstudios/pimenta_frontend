import React from 'react'
import PropTypes from 'prop-types'
import StudentProfileEditCertificates from '../../../../atomic/organisms/Certificates'
import { getBase64 } from '../../../../services/util/image'
import {
  undestroyedItems,
  removeItem,
  removeNewItem
} from '../../../../services/util/hasMany'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class StudentProfileEditCertificatesContainer extends React.Component {
  state = {
    certificates: [],
    newCertificates: [],
    showNewCertificateForm: false,
    newCertificate: {
      title: '',
      pdf: '',
      titleError: '',
      pdfError: '',
      pdfFileName: '',
      pdfFile: null
    }
  }

  componentDidMount() {
    this.setState({ certificates: this.props.certificates })
  }

  changeParentForm = () => {
    const { setFieldValue } = this.props
    const { certificates, newCertificates } = this.state
    const allCertificates = [...certificates, ...newCertificates]

    setFieldValue('certificates', allCertificates)
  }

  handleRemoveCertificate = ({ id }) => () => {
    const { certificates } = this.state

    this.setState(
      _ => ({
        certificates: removeItem(certificates, id)
      }),
      () => this.changeParentForm()
    )
  }

  handleRemoveNewCertificate = removeindex => () => {
    const { newCertificates } = this.state
    this.setState(
      _ => ({ newCertificates: removeNewItem(newCertificates, removeindex) }),
      this.changeParentForm()
    )
  }

  handleAddCertificate = () => {
    const valid = this.validateNewCertificate()

    if (valid) {
      const { title, pdf } = this.state.newCertificate

      const certificateToAdd = {
        title,
        pdf,
        student_profile_id: this.props.profileId
      }

      this.setState(
        prev => ({
          newCertificates: [...prev.newCertificates, certificateToAdd]
        }),
        () => this.changeParentForm()
      )

      this.handleClearAddCertificate()
    }
  }

  validateNewCertificate = () => {
    const { title, pdf, pdfFile } = this.state.newCertificate
    const { i18n } = this.props
    let valid = true

    const errors = {
      titleError: '',
      pdfError: ''
    }

    if (!title || title.trim() === '') {
      errors.titleError = i18n._(t`Title is required`)
      valid = false
    }

    if (!pdf || pdf.trim() === '') {
      errors.pdfError = i18n._(t`PDF is required`)
      valid = false
    }

    if (pdfFile && pdfFile.type !== 'application/pdf') {
      errors.pdfError = i18n._(t`Should be a PDF file`)
      valid = false
    }

    this.setState(prev => ({
      ...prev,
      newCertificate: {
        ...prev.newCertificate,
        ...errors
      }
    }))

    return valid
  }

  handleNewCertificateChange = async e => {
    const { value, name } = e.target
    let newValues = {}

    if (name === 'certificateTitle') {
      newValues = {
        title: value
      }
    } else if (name === 'certificatePdfInput') {
      const file = e.target.files[0]

      newValues = {
        pdf: await getBase64(file),
        pdfFileName: file.name,
        pdfFile: file
      }
    }

    this.setState(
      prev => ({
        ...prev,
        newCertificate: {
          ...prev.newCertificate,
          ...newValues
        }
      }),
      () => this.validateNewCertificate()
    )
  }

  handleClearAddCertificate = () =>
    this.setState(prev => ({
      ...prev,
      showNewCertificateForm: false,
      newCertificate: {
        name: '',
        pdf: '',
        titleError: '',
        pdfError: '',
        pdfFileName: ''
      }
    }))

  handleUploadCertificate = e => console.log(e.target.files)

  handleToggleNewCertificateForm = () =>
    this.setState(prev => ({
      showNewCertificateForm: !prev.showNewCertificateForm
    }))

  render() {
    const {
      certificates,
      showNewCertificateForm,
      newCertificate,
      newCertificates
    } = this.state

    const { setFieldValue } = this.props

    return (
      <StudentProfileEditCertificates
        undestroyedCertificates={undestroyedItems(certificates)}
        newCertificates={newCertificates}
        newCertificate={newCertificate}
        handleRemoveCertificate={this.handleRemoveCertificate}
        handleAddCertificate={this.handleAddCertificate}
        setFieldValue={setFieldValue}
        showNewCertificateForm={showNewCertificateForm}
        handleToggleNewCertificateForm={this.handleToggleNewCertificateForm}
        handleNewCertificateChange={this.handleNewCertificateChange}
        handleClearAddCertificate={this.handleClearAddCertificate}
        handleRemoveNewCertificate={this.handleRemoveNewCertificate}
      />
    )
  }
}

StudentProfileEditCertificatesContainer.propTypes = {
  certificates: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  profileId: PropTypes.number.isRequired
}

export default withI18n()(StudentProfileEditCertificatesContainer)
