import React from 'react'
import styled from 'styled-components'
import Modal from '../organisms/Modal'
import ButtonRounded from '../atoms/ButtonRounded'
import UploadButton from './UploadButton'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { breakpoints } from '../../constants/responsive'
import { imageUploader } from '../../constants/resolutionImage'
import { t } from '@lingui/macro'
import { Trans } from '@lingui/macro'
import { withI18n } from '@lingui/react'

class ImageUploader extends React.Component {
  state = {
    src: null,
    croppedImage: null,
    crop: {
      x: 10,
      y: 10,
      aspect: 16 / 9,
      width: 50
    }
  }

  componentDidMount() {
    const { aspect, width, src = null } = this.props

    this.setState(prev => ({
      ...prev,
      src,
      crop: {
        ...prev.crop,
        aspect,
        width
      }
    }))
  }

  handleSelectFile = async e => {
    if (e.target.files && e.target.files.length > 0) {
      var file = await e.target.files[0]
      this.setState({ src: URL.createObjectURL(file) })
    }
  }

  showCropper = (showCropper = true) => this.setState({ showCropper })

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image
    this.setState(prev => ({ croppedImage: prev.src }))
  }

  onCropComplete = (crop, pixelCrop) => {
    if (this.imageRef) {
      const croppedImage = this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg'
      )

      this.setState({ croppedImage })
    }
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas')
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    return canvas.toDataURL('image/jpeg')
  }

  handleApplyCrop = () => {
    const { handleChange, handleClose } = this.props
    const { croppedImage, src } = this.state

    if (croppedImage) {
      handleChange(croppedImage, src)
      handleClose()
    }
  }

  handleApplyCrop = () => {
    const { handleChange, handleClose } = this.props
    const { croppedImage, src } = this.state

    if (croppedImage) {
      handleChange(croppedImage, src)
      handleClose()
    }
  }

  render() {
    const { handleClose, className, title, i18n } = this.props

    return (
      <Modal onClose={handleClose} resolution={imageUploader.resolution} title={title || i18n._(t`Image Upload`)}>
        <Wrapper className={className}>
          <BackgroundForImage>
            {this.state.src && (
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                crossorigin="anonymous"
                keepSelection={true}
                className='react-crop'
              />
            )}
          </BackgroundForImage>
          <ButtonBar>
            <UploadButton
              name="pictureToCrop"
              handleChange={this.handleSelectFile}
              label={i18n._(t`Choose Image`)}
              accept=".jpg,.jpeg,.gif,.png"
            >
              <Trans>Choose Image</Trans>
            </UploadButton>

            <ApplyButton handleClick={this.handleApplyCrop} small>
              <Trans>Apply</Trans>
            </ApplyButton>
          </ButtonBar>
        </Wrapper>
      </Modal>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const BackgroundForImage = styled.div`
  background: rgba(0, 0, 0, 1);
  height: 51rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: ${breakpoints.sm}) {
    width: 86rem;
  }
`

const ButtonBar = styled.div`
  display: flex;
  padding: 2.4rem;
  justify-content: flex-end;
  align-items: center;
`

const ApplyButton = styled(ButtonRounded)`
  margin-left: 1.2rem;
  height: 100%;
  padding: 1.4rem 6rem;
`

export default withI18n()(ImageUploader)
