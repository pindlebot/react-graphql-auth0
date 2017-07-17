import Profile from './Profile'

import { graphql, gql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const updateUser = gql`
  mutation updateUser($name: String!, $id: ID!, $emailAddress: String!) {
    updateUser(name: $name, id: $id, emailAddress: $emailAddress) {
      id,
      name,
      emailAddress
    }
  }
`;

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      emailAddress
    }
  }
`;

export default compose(
  graphql(updateUser, {
    props: ({ ownProps, mutate }) => ({
      updateUser: ({ name, id, emailAddress }) => mutate({ variables: { name, id, emailAddress } }),
    }),
  }),
  graphql(userQuery, { 
    options: { fetchPolicy: 'network-only' } 
  }),
)(withRouter(Profile))