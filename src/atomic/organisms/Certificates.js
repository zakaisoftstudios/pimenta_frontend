import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../constants/colors'
import Link from '../atoms/Link'
import ButtonText from '../atoms/ButtonText'
import Input from '../atoms/Input'
import Divider from '../atoms/Divider'
import Button from '../atoms/Button'
import ButtonBar from '../molecules/ButtonBar'
import BoxHasMany from '../atoms/BoxHasMany'
import SubHeading from '../atoms/SubHeading'
import UploadButton from '../molecules/UploadButton'
import { Trans } from '@lingui/macro'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const StudentProfileEditCertificates = ({
  undestroyedCertificates,
  newCertificates,
  newCertificate,
  handleRemoveCertificate,
  handleRemoveNewCertificate,
  handleAddCertificate,
  showNewCertificateForm,
  handleToggleNewCertificateForm,
  handleNewCertificateChange,
  handleClearAddCertificate,
  i18n
}) => (
  <React.Fragment>
    <SubHeading>
      <Trans>Certificates</Trans>
    </SubHeading>

    <BoxHasMany>
      {undestroyedCertificates.length > 0 ? (
        <CertificateList>
          {undestroyedCertificates.map(certificate => (
            <li key={certificate.id}>
              <Certificate>
                <Link href={certificate.pdf}>{certificate.title}</Link>

                <ButtonText
                  handleClick={handleRemoveCertificate({
                    id: certificate.id
                  })}
                >
                  <Trans>DELETE</Trans>
                </ButtonText>
              </Certificate>
            </li>
          ))}
        </CertificateList>
      ) : (
        <EmptyMessage>
          <Trans>pick up max 5 certificates</Trans>
        </EmptyMessage>
      )}

      {newCertificates.length > 0 ? (
        <React.Fragment>
          <div>
            <Trans>New certificates:</Trans>
          </div>

          <CertificateList>
            {newCertificates.map((certificate, index) => (
              <li key={index}>
                <Certificate>
                  {certificate.title}

                  <ButtonText handleClick={handleRemoveNewCertificate(index)}>
                    <Trans>DELETE</Trans>
                  </ButtonText>
                </Certificate>
              </li>
            ))}
          </CertificateList>
        </React.Fragment>
      ) : null}

      <Divider />

      {showNewCertificateForm ? (
        <AddCertificate>
          <Input
            name="certificateTitle"
            label={i18n._(t`Title`)}
            error={newCertificate.titleError}
            value={newCertificate.title}
            handleChange={handleNewCertificateChange}
          />

          <Upload>
            <UploadButton
              name="certificatePdf"
              value={newCertificate.pdf}
              handleChange={handleNewCertificateChange}
              accept="application/pdf"
              label={i18n._(t`Upload a Certificate`)}
              error={newCertificate.pdfError}
              fileName={newCertificate.pdfFileName}
              small
            />
          </Upload>

          <ButtonBar mini>
            <Button type="button" handleClick={handleClearAddCertificate} mini>
              <Trans>Cancel</Trans>
            </Button>
            <Button
              type="button"
              handleClick={handleAddCertificate}
              primary
              mini
            >
              <Trans>Add</Trans>
            </Button>
          </ButtonBar>
        </AddCertificate>
      ) : (
        <AddCertificateButton>
          <Button type="button" handleClick={handleToggleNewCertificateForm}>
            <Trans>Add Certificate</Trans>
          </Button>
        </AddCertificateButton>
      )}
    </BoxHasMany>
  </React.Fragment>
)

const EmptyMessage = styled.div`
  color: ${colors.lightGray};
  margin: 0.5rem 0;
`

const CertificateList = styled.ul`
  width: 100%;
  color: ${colors.gray};
  list-style-type: none;
  padding-left: 0;
`

const Certificate = styled.div`
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AddCertificate = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
`

const AddCertificateButton = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`

const Upload = styled.div`
  margin: 0.5rem 0 1rem 0;
`

StudentProfileEditCertificates.propTypes = {
  undestroyedCertificates: PropTypes.array.isRequired,
  newCertificates: PropTypes.array.isRequired,
  newCertificate: PropTypes.object.isRequired,
  handleRemoveCertificate: PropTypes.func.isRequired,
  handleAddCertificate: PropTypes.func.isRequired,
  handleRemoveNewCertificate: PropTypes.func.isRequired,
  handleToggleNewCertificateForm: PropTypes.func.isRequired,
  handleNewCertificateChange: PropTypes.func.isRequired,
  handleClearAddCertificate: PropTypes.func.isRequired,
  showNewCertificateForm: PropTypes.bool.isRequired
}

export default withI18n()(StudentProfileEditCertificates)
