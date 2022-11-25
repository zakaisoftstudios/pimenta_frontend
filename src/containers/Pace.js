import React from 'react'
import { connect } from 'react-redux'
import Pace from '../atomic/atoms/Pace'
import { withRouter } from 'react-router-dom'

export default withRouter(
  connect(
    ({ notification: { showPace } }) => ({ showPace }),
    null
  )(Pace)
)
