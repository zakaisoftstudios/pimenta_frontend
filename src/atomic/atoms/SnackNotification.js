import React from 'react'
import { connect } from 'react-redux'
import { Notification } from 'react-notification'
import { hideSnackNotification } from '../../actions/notification'
import PropTypes from 'prop-types'

const SnackNotification = ({
  hideSnackNotification,
  snackNotificationVisible,
  snackNotificationMessage
}) => (
  <Notification
    isActive={snackNotificationVisible}
    message={snackNotificationMessage}
    onClick={hideSnackNotification}
    dismissAfter={10000}
    onDismiss={() => hideSnackNotification()}
    action="close"
    barStyle={{
      font: '1.1rem',
      color: '#2e444e',
      background: 'linear-gradient(180deg, #F3F3F3 0%, #FFFFFF 84.53%)'
    }}
  />
)

SnackNotification.propTypes = {
  hideSnackNotification: PropTypes.func.isRequired,
  snackNotificationVisible: PropTypes.bool.isRequired,
  snackNotificationMessage: PropTypes.string.isRequired
}

const mapStateToProps = ({
  notification: { snackNotificationVisible, snackNotificationMessage }
}) => ({
  snackNotificationVisible,
  snackNotificationMessage
})

export default connect(
  mapStateToProps,
  { hideSnackNotification }
)(SnackNotification)
