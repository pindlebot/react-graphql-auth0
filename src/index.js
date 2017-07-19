import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'tachyons/css/tachyons.css'
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import createClient from './client';
import Entry from './Entry';

injectTapEventPlugin();
const client = createClient();

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <Entry />
  </ApolloProvider>
  ),
  document.getElementById('root'),
);
