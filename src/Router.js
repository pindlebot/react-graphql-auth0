import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { withApollo, compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import App from './containers/App'
import Profile from './containers/Profile'
import theme from './lib/theme'
import { APP_PATH, PROFILE_PATH } from './lib/config'
import { saveAccessToken, updateProfile } from './lib/reducer'
import './css/style.css'

class Entry extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  static propTypes = {
    lock: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    saveAccessToken: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  }

  getChildContext = () => ({
    muiTheme: getMuiTheme(theme)
  })

  componentWillUnmount () {
    // this.props.subscribeToUser()
  }

  componentDidMount () {
    this.props.lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.props.client.resetStore().then(() => {
        this.props.saveAccessToken(authResult.accessToken)
      })
    })
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.accessToken && !nextProps.data.user) {
      const profile = await this.getUserInfo(nextProps.accessToken)
      await this.props.createUser({ variables: {
        idToken: window.localStorage.getItem('auth0IdToken'),
        emailAddress: profile.email,
        name: profile.name,
        emailSubscription: true
      } })
      await this.props.client.resetStore()
    }
  }

  getUserInfo = accessToken =>
    new Promise((resolve, reject) => {
      this.props.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) reject(err)
        resolve(profile)
      })
    })

  render () {
    return (
      <Router>
        <div>
          <Route exact path={APP_PATH} component={App} />
          <Route path={PROFILE_PATH} component={Profile} />
        </div>
      </Router>
    )
  }
}

const createUser = gql`
  mutation createUser(
    $idToken: String!, 
    $name: String!, 
    $emailAddress: String!, 
    $emailSubscription: Boolean!
  ){
    createUser(
      authProvider: {auth0: {idToken: $idToken}}, 
      name: $name, 
      emailAddress: $emailAddress, 
      emailSubscription: $emailSubscription
    ) {
      id
    }
  }
`

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      emailAddress
    }
  }
`

const USER_SUBSCRIPTION = gql`
  subscription {
    User(filter: { mutation_in: [CREATED] }) {
      node {
        id
        name
        emailAddress
      }
    }
  }
`

const subscribeToUser = (props) => {
  return props.data.subscribeToMore({
    document: USER_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data) {
        return prev
      }
      return { user: subscriptionData.data.User.node }
    }
  })
}

const mapStateToProps = state => ({
  lock: state.app.lock,
  profile: state.app.profile,
  accessToken: state.app.accessToken
})

const mapDispatchToProps = dispatch => ({
  updateProfile: profile => dispatch(updateProfile(profile)),
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken))
})

export default withApollo(
  compose(
    graphql(createUser, {
      props: ({ ownProps, mutate }) => ({
        createUser: variables => mutate(variables)
      })
    }),
    graphql(userQuery, {
      options: { fetchPolicy: 'network-only' }
    }),
    connect(mapStateToProps, mapDispatchToProps)
  )(Entry)
)
