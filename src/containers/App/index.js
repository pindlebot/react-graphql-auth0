import { graphql, compose, withApollo } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
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

const mapStateToProps = state => ({
  lock: state.app.lock
})

export default withApollo(compose(
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' }
  }),
  connect(mapStateToProps)
)(withRouter(App)))
