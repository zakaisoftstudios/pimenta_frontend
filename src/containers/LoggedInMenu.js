import React from 'react'
import LoggedInMenu from '../components/Header/LoggedInMenu'
import { toggleMobileMenu } from '../actions/mobileMenu'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class LoggedInMenuContainer extends React.Component {
  handleToggleMobileMenu = () => this.props.toggleMobileMenu()

  render() {
    const { mobileMenuVisible } = this.props

    return (
      <LoggedInMenu
        mobileMenuVisible={mobileMenuVisible}
        toggleMobileMenu={this.handleToggleMobileMenu}
      />
    )
  }
}

LoggedInMenuContainer.propTypes = {
  mobileMenuVisible: PropTypes.bool.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired
}

const mapStateToProps = ({ mobileMenu: { visible } }) => ({
  mobileMenuVisible: visible
})

const mapDispatchToProps = dispatch => ({
  toggleMobileMenu: () => dispatch(toggleMobileMenu())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInMenuContainer)
