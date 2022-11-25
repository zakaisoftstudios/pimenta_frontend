import React from 'react'
import styled from 'styled-components'
import SubHeading from '../atoms/SubHeading'
import Link from '../atoms/Link'
import { Download } from 'styled-icons/feather/Download'
import ItalicText from '../atoms/ItalicText'
import { Trans } from '@lingui/macro'

export const StudentProfileCertificates = ({ certificates }) => (
  <Wrapper>
    <SubHeading>
      <Trans>Certificates</Trans>
    </SubHeading>

    {certificates.length > 0 ? (
      certificates.map(({ pdf, title }) => (
        <CertificateLink href={pdf} target="_blank">
          <DownloadIcon />
          <div>{title}</div>
        </CertificateLink>
      ))
    ) : (
      <ItalicText>
        <Trans>no certificates</Trans>
      </ItalicText>
    )}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const CertificateLink = styled(Link)`
  margin-bottom: 1.2rem;
  font-weight: normal;
  text-decoration-line: none;
  display: flex;
  align-items: center;
`

const DownloadIcon = styled(Download)`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.6rem;
`

export default StudentProfileCertificates
