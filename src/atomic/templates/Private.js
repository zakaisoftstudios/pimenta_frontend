import React from 'react'
import PrivateFullContainer from '../atoms/PrivateFullContainer'
import Container from '../atoms/Container'
import HeaderContainer from '../../containers/Header'
import PropTypes from 'prop-types'
import SnackNotification from '../atoms/SnackNotification'
import BottomNavigation from '../molecules/BottomNavigation'
import { createMuiTheme } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const PrivateTemplate = ({ component: Component, routeProps }) => (
  <MuiThemeProvider theme={theme}>
    <SnackNotification />
    <HeaderContainer />

    <PrivateFullContainer>
      <Container>
        <Component {...routeProps} />
      </Container>
    </PrivateFullContainer>

    <BottomNavigation />
  </MuiThemeProvider>
)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#01c0ea'
    }
  },
  typography: {
    fontSize: 22
  }
})

PrivateTemplate.propTypes = {
  component: PropTypes.func.isRequired,
  routeProps: PropTypes.object.isRequired
}

export default PrivateTemplate
