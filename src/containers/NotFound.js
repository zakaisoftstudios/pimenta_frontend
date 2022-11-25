import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { profileTypes } from '../constants/profileTypes'

class NotFound extends React.Component {
  render() {
    const { profileType, authenticated } = this.props

    const redirectUrl = authenticated
      ? profileTypes[profileType].profileUrl
      : '/login'

    return <Redirect to={redirectUrl} />
  }
}

const mapStateToProps = ({ auth: { profileType, authenticated } }) => ({
  profileType,
  authenticated
})

export default connect(
  mapStateToProps,
  null
)(NotFound)
