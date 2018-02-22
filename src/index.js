import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import 'tachyons/css/tachyons.css'
import createClient from './lib/client'
import Router from './Router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './lib/reducer'

const client = createClient()
const store = createStore(reducer.appReducer)

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
