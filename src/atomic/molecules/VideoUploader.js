import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import UploadButton from './UploadButton'
import { getBase64 } from '../../services/util/image'
import 'react-image-crop/dist/ReactCrop.css'
import VideoPlayer from './VideoPlayer'
import { breakpoints } from '../../constants/responsive'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'
import ErrorMessage from '../atoms/ErrorMessage'

const MAX_VIDEO_SIZE_IN_MB = 100

class VideoUploader extends React.Component {
  state = {
    src: null,
    error: null
  }

  componentDidMount() {
    const { src = null } = this.props

    this.setState({
      src
    })
  }

  validateSize = video => {
    const sizeMb = video.size / 1024 / 1024

    if (sizeMb > MAX_VIDEO_SIZE_IN_MB) {
      this.setState({
        error: this.props.i18n._(t`Please upload only videos under 100mb.`)
      })

      return false
    } else {
      this.setState({ error: null })
      return true
    }
  }

  handleSelectFile = async e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const valid = this.validateSize(file)

      if (valid) {
        const src = await getBase64(e.target.files[0])
        this.setState(() => ({ src: null }), () => this.setState({ src }))
      }
    }
  }

  handleApplyVideo = () => {
    const { handleChange, handleClose } = this.props
    const { src } = this.state

    if (src) {
      handleChange(src)
      handleClose()
    }
  }

  render() {
    const { handleClose, className, title, i18n } = this.props
    const { src, error } = this.state

    return (
      <Modal onClose={handleClose} title={title || i18n._(t`Video Upload`)}>
        <Wrapper className={className}>
          <BackgroundForVideo>
            {src && <VideoPlayer src={src} />}
          </BackgroundForVideo>

          <ButtonBar>
            <ErrorLarge>{error}</ErrorLarge>

            <UploadButton
              name="uploadVideo"
              handleChange={this.handleSelectFile}
              label={i18n._(t`Choose Video`)}
              accept=".mp4,.mov"
            />

            <ApplyButton handleClick={this.handleApplyVideo}>
              <Trans>Apply</Trans>
            </ApplyButton>
          </ButtonBar>

          <Error>{error}</Error>
        </Wrapper>
      </Modal>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonBar = styled.div`
  display: flex;
  padding: 2.4rem;
  padding-bottom: 0;
  justify-content: flex-end;
  align-items: center;

  @media (min-width: ${breakpoints.sm}) {
    margin-bottom: 2.4rem;
  }
`

const ApplyButton = styled(ButtonRounded)`
  margin-left: 1.2rem;
  padding: 1.4rem 6rem;
  height: 100%;
`

const BackgroundForVideo = styled.div`
  background: rgba(0, 0, 0, 1);
  height: 51rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${breakpoints.sm}) {
    width: 86rem;
  }
`

const Error = styled(ErrorMessage)`
  text-align: center;
  flex: 1;
  margin: 0.5rem 0;

  @media (min-width: ${breakpoints.sm}) {
    display: none;
  }
`

const ErrorLarge = styled(Error)`
  margin: 0;
  display: none;

  @media (min-width: ${breakpoints.sm}) {
    display: block;
  }
`

export default withI18n()(VideoUploader)
