import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient } from 'react-apollo';
import 'tachyons';
import store from './store';
import { connect } from 'react-redux';

import createClient from './client';

const client = createClient();

ReactDOM.render((
  <ApolloProvider store={store} client={client}>
    <Router>
      <Route exact path="/" component={App} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root'),
);
