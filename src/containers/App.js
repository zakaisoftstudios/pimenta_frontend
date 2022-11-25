import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import sessionStorageItems from '../constants/sessionStorageItems'
import { loadCurrentUser } from '../actions/auth'
import App from '../atomic/pages/App'
import { withRouter } from 'react-router-dom'
import { appReady } from '../actions/initialLoad'
import ActionCable from 'actioncable'
import { ActionCableProvider } from 'react-actioncable-provider'
import { actionCableUrl } from '../setup/actionCable'
import { I18nProvider } from '@lingui/react'
import localeCatalogDE from '../locales/de/messages'
import { getUserLocale } from '../locales'

class AppContainer extends React.Component {
  async componentDidMount() {
    const { appReady, loadCurrentUser } = this.props

    const token = sessionStorage.getItem(sessionStorageItems.userToken)
    const userLocale = getUserLocale()

    if (!token || token === '') {
      appReady({ userLocale })
    } else {
      await loadCurrentUser()
      appReady({ userLocale })
    }
  }

  render() {
    const cable = ActionCable.createConsumer(actionCableUrl())

    return this.props.ready ? (
      <ActionCableProvider cable={cable}>
        <App />
      </ActionCableProvider>
    ) : (
      <div>Loading...</div>
    )
  }
}

AppContainer.propTypes = {
  loadCurrentUser: PropTypes.func.isRequired,
  appReady: PropTypes.func.isRequired,
  ready: PropTypes.bool.isRequired
}

const mapStateToProps = ({
  initialLoad: { ready },
  auth: { authenticated }
}) => ({
  ready,
  authenticated
})

const mapDispatchToProps = dispatch => ({
  loadCurrentUser: () => dispatch(loadCurrentUser()),
  appReady: payload => dispatch(appReady(payload))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppContainer)
)
