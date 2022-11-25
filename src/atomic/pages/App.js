import React from 'react'
import PublicTemplate from '../templates/Public'
import {
  publicRoutes,
  searchRoutes,
  companyRoutes,
  studentRoutes,
  universityRoutes,
  adminRoutes
} from '../../constants/routes'
import _ from 'lodash'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from '../../containers/PrivateRoute'
import NotFoundContainer from '../../containers/NotFound'
import PrivateTemplate from '../templates/Private'

const App = () => {
  return (
    <Switch>
      {_.map(publicRoutes, (route, key) => {
        const { component, path } = route
        return (
          <Route
            exact
            path={path}
            key={key}
            render={routeProps => (
              <PublicTemplate component={component} routeProps={routeProps} />
            )}
          />
        )
      })}

      {_.map(searchRoutes, (route, key) => {
        const { component, path } = route
        return (
          <Route
            exact
            path={path}
            key={key}
            component={component}
          />
        )
      })}

      {_.map(companyRoutes, (route, key) => {
        const { component, template, path, roles } = route
        return (
          <PrivateRoute
            exact
            path={path}
            key={key}
            allowedRoles={roles}
            component={component}
            template={template}
          />
        )
      })}

      {_.map(studentRoutes, (route, key) => {
        const { component, template, path, roles } = route
        return (
          <PrivateRoute
            exact
            path={path}
            key={key}
            allowedRoles={roles}
            component={component}
            template={template}
          />
        )
      })}

      {_.map(universityRoutes, (route, key) => {
        const { component, template, path, roles } = route
        return (
          <PrivateRoute
            exact
            path={path}
            key={key}
            allowedRoles={roles}
            component={component}
            template={template}
          />
        )
      })}

      {_.map(adminRoutes, (route, key) => {
        const { component, template, path, roles } = route
        return (
          <PrivateRoute
            exact
            path={path}
            key={key}
            allowedRoles={roles}
            component={component}
            template={template}
          />
        )
      })}

      <Route component={NotFoundContainer} />
    </Switch>
  )
}

export default App
