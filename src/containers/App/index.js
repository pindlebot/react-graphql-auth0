import React from 'react'
import { graphql, gql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {tokenIdReducer, saveAccessToken} from '../../reducer'

import App from './App'

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      emailAddress
    }
  }
`

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

const updateUser = gql`
  mutation updateUser($name: String!, $id: ID!) {
    updateUser(name: $name, id: $id) {
      id,
      name
    }
  }
`

const Wrapper = withApollo(compose(
  graphql(createUser, {
    props: ({ownProps, mutate}) => ({
      createUser: (variables) => mutate (variables)
    })
  }),
  graphql(updateUser, {
    props: ({ownProps, mutate}) => ({
      updateUser: ({name, id}) => mutate ({variables: {name, id}})
    })
  })
)(graphql(userQuery, { options: {fetchPolicy: 'network-only'} })(App)))

const mapStateToProps = (state) => ({ 
  lock: state.app.lock,
  profile: state.app.profile,
  accessToken: state.app.accessToken
})

const mapDispatchToProps = (dispatch) => ({ 
  updateProfile: (profile) => dispatch(updateProfile(profile)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(Wrapper))


