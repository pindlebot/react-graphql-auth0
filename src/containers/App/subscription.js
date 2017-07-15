import { graphql, gql } from 'react-apollo';

const subscription = {
  document: gql`
    subscription {
      User(filter: { mutation_in: [CREATED] }) {
        node {
          id
        }
      }
    }
  `,
  variables: null,
  updateQuery: (prevState, { subscriptionData }) => ({
    user: [
      { ...subscriptionData.data.User.node },
      ...prevState.user,
    ],
    onError: err => console.error(err),
  }),
};

export default subscription;
