import React from 'react'
import PublicFullContainer from '../atoms/PublicFullContainer'
import Container from '../atoms/Container'
import Pace from '../../containers/Pace'
import PropTypes from 'prop-types'
import SnackNotification from '../atoms/SnackNotification'
import Footer from '../atoms/Footer';

const PublicTemplate = ({ component: Component, routeProps }) => (
  <React.Fragment>
    <Pace />
    <SnackNotification />

    <PublicFullContainer>
      <Container>
        <Component {...routeProps} />
      </Container>
    </PublicFullContainer>
    <Footer />
  </React.Fragment>
)

PublicTemplate.propTypes = {
  component: PropTypes.func.isRequired,
  routeProps: PropTypes.object.isRequired
}

export default PublicTemplate
