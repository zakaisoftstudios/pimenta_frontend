import React from 'react'
import styled from 'styled-components'
import VideoPlayer from '../molecules/VideoPlayer'

const DisplayVideo = ({ className, src }) => (
  <Wrapper className={className} src={src} />
)

const Wrapper = styled(VideoPlayer)`
  width: 34.7rem;
  height: auto;
  margin-bottom: 2.4rem;
`

export default DisplayVideo
