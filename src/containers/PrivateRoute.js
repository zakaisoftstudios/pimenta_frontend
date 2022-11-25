import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { profileTypes } from '../constants/profileTypes'

const PrivateRoute = ({
  component,
  template,
  allowedRoles,
  authenticated,
  profileType,
  profileComplete,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (authorized(authenticated, allowedRoles, profileType)) {
        return (
          <RouteRender
            routeProps={props}
            profileComplete={profileComplete}
            template={template}
            component={component}
            profileType={profileType}
          />
        )
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    }}
  />
)

const RouteRender = ({
  component: Component,
  template: Template = null,
  routeProps,
  profileComplete,
  profileType
}) => {
  if (forceProfileCompletion(profileComplete, profileType, routeProps)) {
    return (
      <Redirect
        to={{
          pathname: profileTypes[profileType].editProfileUrl,
          state: { from: routeProps.location }
        }}
      />
    )
  } else {
    return Template ? (
      <Template routeProps={routeProps} component={Component} />
    ) : (
      <Component {...routeProps} />
    )
  }
}

const authorized = (authenticated, allowedRoles, profileType) =>
  authenticated === true && allowedRoles.includes(profileType)

const forceProfileCompletion = (profileComplete, profileType, routeProps) =>
  profileComplete === false &&
  routeProps.match.url !== profileTypes[profileType].editProfileUrl

const mapStateToProps = ({
  auth: { authenticated, profileType, profileComplete }
}) => ({
  authenticated,
  profileType,
  profileComplete
})

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  profileType: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  template: PropTypes.func,
  allowedRoles: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  null
)(PrivateRoute)
