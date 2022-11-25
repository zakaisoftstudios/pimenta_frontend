import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ActionCable } from 'react-actioncable-provider'
import { updateChatNotificationsCount } from '../actions/notification'
import HeaderMenu from '../atomic/molecules/HeaderMenu'
import { profileTypes } from '../constants/profileTypes'

class HeaderMenuContainer extends React.Component {
  state = { activeItem: 'public' }

  componentDidMount() {
    const path = window.location.pathname
    const activeMenuItem = profileTypes[this.props.profileType].menuItems.find(
      menuItem => menuItem.path === path
    )
    if (activeMenuItem) this.setState({ activeItem: activeMenuItem.name })
  }

  handleItemClick = name => () => this.setState({ activeItem: name })

  handleChatNotificationReceived = ({ count }) => {
    this.props.updateChatNotificationsCount(count)
  }

  render() {
    const { activeItem } = this.state
    const { chatNotificationsCount } = this.props

    const { profileType } = this.props

    return (
      <React.Fragment>
        <HeaderMenu
          handleItemClick={this.handleItemClick}
          activeItem={activeItem}
          profileType={profileType}
          chatNotificationsCount={chatNotificationsCount}
        />

        <ActionCable
          channel={{
            channel: 'ChatNotificationsChannel'
          }}
          onReceived={this.handleChatNotificationReceived}
        />
      </React.Fragment>
    )
  }
}

HeaderMenuContainer.propTypes = {
  visible: PropTypes.bool.isRequired,
  profileType: PropTypes.string.isRequired
}

const mapStateToProps = ({
  mobileMenu: { visible },
  auth: { profileType },
  notification: { chatNotificationsCount }
}) => ({
  visible,
  profileType,
  chatNotificationsCount
})

const mapDispatchToProps = dispatch => ({
  updateChatNotificationsCount: count =>
    dispatch(updateChatNotificationsCount({ count }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderMenuContainer)
