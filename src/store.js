import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { appReducer } from './reducer';
import createClient from './client';

const client = createClient();
const store = createStore(
  combineReducers({
    app: appReducer,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

module.exports = store;
