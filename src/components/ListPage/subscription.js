import { graphql, gql } from "react-apollo";

const subscription = {
  document: gql`
    subscription {
      Post(filter: { mutation_in: [CREATED] }) {
        node {
          id
          title
          description
        }
      }
    }
  `,
  variables: null,
  updateQuery: (prevState, { subscriptionData }) => ({
    allPosts: [
      { ...subscriptionData.data.Post.node },
      ...prevState.allPosts
    ],
    onError: err => console.error(err)
  })
}

export default subscription;
