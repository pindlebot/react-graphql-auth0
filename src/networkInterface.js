import { ApolloClient, createNetworkInterface } from 'react-apollo'
import config from '../config'

const networkInterface = createNetworkInterface({ 
  uri: config.GRAPH_COOL_ENDPOINT 
})

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  },
}])

module.exports = networkInterface