import { graphql, gql, compose } from 'react-apollo';
import ListPage from './ListPage';

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const FeedQuery = gql`query FeedQuery {
  allPosts(orderBy: createdAt_DESC) {
    id
    title
    description
  }
}`;

const POSTS_SUBSCRIPTION = gql`
  subscription {
    Post(filter: { mutation_in: [CREATED] }) {
      node {
        id
        title
        description
      }
    }
  }
`

const subscribeToPosts = (props) => {
  return props.data.subscribeToMore({
    document: POSTS_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {
      subscriptionData
    }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      return {
        allPosts: [{...subscriptionData.data.Post.node
          },
          ...prev.allPosts
        ]
      }
    },
  })
}

export default compose(
  graphql(deletePost, {
    props: ({ ownProps, mutate }) => ({
      deletePost: ({ id }) => mutate({ variables: { id } }),
    }),
  }),
  graphql(FeedQuery, {
    props: props => ({
      subscribeToPosts: subscribeToPosts(props)
    }),
  }),
  graphql(FeedQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(ListPage);
