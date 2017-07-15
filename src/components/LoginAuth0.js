import React, { Component } from 'react'
import Auth0Lock from 'auth0-lock'
import { withRouter } from 'react-router-dom'
import {getProfileData} from '../auth'
import config from '../config'
import { graphql, gql } from 'react-apollo'
import PropTypes from 'prop-types'

class LoginAuth0 extends Component {

  constructor (props) {
    super(props)

  }

  render() {
    return (
      <div>
        <span
          onClick={() => { this.props.lock.show() }}
          className='br2 ba b--mid-gray dib pa2 mid-gray dim pointer'
        >Log in with Auth0
        </span>
      </div>
    )
  }
}

LoginAuth0.propTypes = {
  history: PropTypes.object.isRequired,
}


const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: {fetchPolicy: 'network-only'}})(withRouter(LoginAuth0))
)