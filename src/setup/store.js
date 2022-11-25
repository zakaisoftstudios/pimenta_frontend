import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import combinedReducers from '../reducers'

const middlewares = applyMiddleware(thunk, logger)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(combinedReducers, composeEnhancers(middlewares))

export default store