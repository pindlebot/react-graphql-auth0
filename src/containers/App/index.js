import React from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {tokenIdReducer} from '../../reducer'

import App from './App'

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const options = { options: {fetchPolicy: 'network-only'} }

const Wrapper = graphql(createUser, { name: 'createUser' })(graphql(userQuery, options)(App))

const mapStateToProps = (state) => (
  { app: state.app }
)

const mapDispatchToProps = (dispatch) => (
    { tokenIdReducer: (idToken) => dispatch(tokenIdReducer(idToken)) }
)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(Wrapper))


