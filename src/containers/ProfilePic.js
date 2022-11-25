import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'
import ProfilePic from '../atomic/atoms/ProfilePic'

export default connect(({ auth: { profilePic } }) => ({ profilePic }))(
  ProfilePic
)
