import React from 'react'
import PropTypes from 'prop-types'
import { Player } from 'video-react'
import 'video-react/dist/video-react.css'
import styled from 'styled-components'
import { BigPlayButton, ControlBar, Shortcut } from 'video-react'

const VideoPlayer = ({
  src = '',
  noPlay = false,
  className,
  handlePlayerRef
}) => (
  <Wrapper className={className}>
    <Player
      playsInline
      fluid={false}
      width="100%"
      height="100%"
      src={src}
      ref={handlePlayerRef}
    >
      <BigPlayButton position="center" disabled={noPlay} />
      <ControlBar disabled={noPlay} />
      <Shortcut clickable={!noPlay} />
    </Player>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

VideoPlayer.propTypes = {
  src: PropTypes.string
}

export default VideoPlayer
