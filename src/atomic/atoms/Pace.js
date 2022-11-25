import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Pace_ from 'react-pace-progress'

const Pace = ({ showPace }) => (
  <React.Fragment>
    {showPace && (
      <PaceWrapper>
        <Pace_ color="#fff" height={3} />
      </PaceWrapper>
    )}
  </React.Fragment>
)

const PaceWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 9999;
  position: -webkit-sticky;
`

Pace.propTypes = {
  showPace: PropTypes.bool.isRequired
}

export default Pace
