import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import saga from '../sagas'
import { rootReducer } from "../reducers";

const initialState = {};

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, initialState, composeEnhancers(middleware))
sagaMiddleware.run(saga)
export default store