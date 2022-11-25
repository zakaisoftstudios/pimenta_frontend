import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import store from './setup/store'
import { BrowserRouter } from 'react-router-dom'
import './assets/index.css'
import './assets/date-picker.css'
import 'normalize.css'
import AppContainer from './containers/App'
import { I18nProvider } from '@lingui/react'
import i18n from './locales'
import ErrorHandler from './atomic/organisms/ErrorHandler'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://ef378e4e69324e23be52aeaf41b30bbf@sentry.io/1463743'
})

ReactDOM.render(
  <ErrorHandler>
    <I18nProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </Provider>
    </I18nProvider>
  </ErrorHandler>,

  document.getElementById('root')
)

registerServiceWorker()
