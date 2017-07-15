import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import CreatePost from './containers/CreatePost'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider, ApolloClient } from 'react-apollo'
import 'tachyons'
import config from './config'
import store from './store'
import client from './client'

class Entry extends React.Component {
  render() { 
    return(
      <ApolloProvider store={store} client={client}>
        <Router>
          <div>
            <Route exact path='/' component={App} />
            {/*<Route path='/create' component={CreatePost} />*/}
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
