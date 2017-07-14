import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import CreatePost from './components/CreatePost'
import CreateUser from './components/CreateUser'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient } from 'react-apollo'
import 'tachyons'
import Auth0Lock from 'auth0-lock'

import config from '../config'

import networkInterface from './networkInterface'
var client = new ApolloClient({ networkInterface })

class Entry extends React.Component {

  render() { 
    return(
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path='/' component={App} />
            <Route path='/create' component={CreatePost} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

ReactDOM.render((
  <Entry />
  ),
  document.getElementById('root')
)
