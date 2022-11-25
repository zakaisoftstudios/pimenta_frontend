import React from 'react'
// import Header from '../components/Header/Header'
import Header from '../atomic/molecules/Header'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HeaderContainer extends React.Component {
  render() {
    const { showPace, authenticated } = this.props
    return <Header showPace={showPace} authenticated={authenticated} />
  }
}

HeaderContainer.propTypes = {
  showPace: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({
  notification: { showPace },
  auth: { authenticated }
}) => ({
  showPace,
  authenticated
})

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(HeaderContainer)
)
