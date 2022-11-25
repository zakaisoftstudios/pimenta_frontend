import React from 'react'
import ImageUploader from '../molecules/ImageUploader'
import VideoUploader from '../molecules/VideoUploader'
import _ from 'lodash'
import { withInitialOrder } from '../../services/attachments'
import * as ProfileAttachmentsAPI from '../../services/api/profileAttachments'

export default class MediaAttachmentsForm extends React.Component {
  state = {
    imageUploaderProps: {
      title: null,
      aspect: null,
      width: null,
      src: null,
      attachmentId: null
    },
    videoUploaderProps: {
      attachmentId: null,
      src: null
    },
    showImageUploader: false,
    showVideoUploader: false,
    attachments: [],
    ready: false
  }

  componentDidMount() {
    const { initialItems, usageType } = this.props

    this.setState({
      attachments: this.normalizedAttachments(
        withInitialOrder(initialItems, usageType)
      ),
      ready: true
    })
  }

  normalizedAttachments = attachments =>
    attachments.map((attachment, i) => ({
      ...attachment,
      index: i,
      original_src:
        attachment.purpose === 'video'
          ? attachment.video_url
          : attachment.picture_url
    }))

  handleShowImageUploader = ({
    imageType: { width, aspect, title },
    attachmentId
  }) => () =>
    this.setState({
      showImageUploader: true,
      imageUploaderProps: {
        title,
        aspect,
        width,
        attachmentId,
        src: this.findAttachment(attachmentId).original_src
      }
    })

  handleShowVideoUploader = ({ attachmentId }) => () =>
    this.setState({
      showVideoUploader: true,
      videoUploaderProps: {
        attachmentId,
        src: this.findAttachment(attachmentId).video_url
      }
    })

  handleHideImageUploader = () =>
    this.setState({ showImageUploader: false, imageUploaderTitle: '' })

  handleHideVideoUploader = () => this.setState({ showVideoUploader: false })

  findAttachment = idToFind =>
    this.state.attachments.find(({ id }) => id === idToFind)

  handleUpdateAttachment = attachmentId => (newScr, originalSrc) => {
    const { handleUpdateBackendAttachment } = this.props
    const attachment = this.findAttachment(attachmentId)

    const updatedAttachment =
      attachment.purpose === 'video'
        ? {
            ...attachment,
            video: newScr,
            video_url: newScr,
          }
        : {
            ...attachment,
            picture: newScr,
            picture_url: newScr,
            original_src: originalSrc
          }

    this.setState({ attachments: this.updateAttachment(updatedAttachment) })

    handleUpdateBackendAttachment({
      ...(!updatedAttachment._new && {
        id: updatedAttachment.id
      }),
      ...(updatedAttachment.purpose === 'video' && {
        video: updatedAttachment.video
      }),
      ...(updatedAttachment.purpose !== 'video' && {
        picture: updatedAttachment.picture
      }),
      purpose: updatedAttachment.purpose
    })
  }

  handleDeleteAttachment = attachmentId => () => {
    this.handleUpdateAttachment(attachmentId)(null, null)
  }

  updateAttachment = updatedAttachment => {
    const updatedAttachments = [
      ...this.state.attachments.filter(
        attachment => attachment.id !== updatedAttachment.id
      ),
      updatedAttachment
    ]

    return _.sortBy(updatedAttachments, 'index')
  }

  getAttachmentsForSubmit = () =>
    this.state.attachments.map(({ id, picture, video, purpose, _new }) =>
      _new
        ? {
            picture,
            video,
            purpose
          }
        : {
            id,
            picture,
            video,
            purpose
          }
    )

  render() {
    const {
      attachments,
      ready,
      imageUploaderProps,
      videoUploaderProps,
      showImageUploader,
      showVideoUploader
    } = this.state

    const childrenProps = {
      attachments,
      getAttachmentsForSubmit: this.getAttachmentsForSubmit,
      handleShowImageUploader: this.handleShowImageUploader,
      handleDeleteAttachment: this.handleDeleteAttachment,
      handleShowVideoUploader: this.handleShowVideoUploader
    }

    return ready ? (
      <React.Fragment>
        {this.props.children(childrenProps)}

        {showImageUploader && (
          <ImageUploader
            title={imageUploaderProps.title}
            width={imageUploaderProps.width}
            aspect={imageUploaderProps.aspect}
            src={imageUploaderProps.src}
            handleClose={this.handleHideImageUploader}
            handleChange={this.handleUpdateAttachment(
              imageUploaderProps.attachmentId
            )}
          />
        )}

        {showVideoUploader && (
          <VideoUploader
            src={videoUploaderProps.src}
            handleClose={this.handleHideVideoUploader}
            handleChange={this.handleUpdateAttachment(
              videoUploaderProps.attachmentId
            )}
          />
        )}
      </React.Fragment>
    ) : null
  }
}
