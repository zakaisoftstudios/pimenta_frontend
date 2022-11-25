import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/responsive'
import { getVideo } from '../../services/attachments'
import VideoPlayer from './VideoPlayer'

export default ({ attachments }) => {
  const videoUrl = getVideo(attachments).video_url

  return (
    videoUrl && (
      <Wrapper>
        <VideoPlayer src={videoUrl} />
      </Wrapper>
    )
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 19.5rem;
  align-items: center;
  background: black;
  margin-bottom: 2.4rem;
  @media (min-width: ${breakpoints.sm}) {
    width: 34.7rem;
  }
`
