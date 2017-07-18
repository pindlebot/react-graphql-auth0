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
    Post(filter: { mutation_in: [CREATED, DELETED] }) {
      node {
        id
        title
        description
      }
      previousValues {
        id
      }
    }
  }
`

const subscribeToPosts = (props) => {
  return props.allPosts.subscribeToMore({
    document: POSTS_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {
      subscriptionData
    }) => {
      
      if (!subscriptionData.data) {
        return prev;
      }
      console.log(subscriptionData)
      if(!subscriptionData.data.Post.node) {
        var id = subscriptionData.data.Post.previousValues.id
        var allPosts = prev.allPosts.filter(x => x.id !== id)
        return {
          allPosts: [...allPosts]
        }
      }
      
      if (prev.allPosts.map(post => post.id).indexOf(subscriptionData.data.Post.node.id) < 0) {
        return { allPosts: [...prev.allPosts, { ...subscriptionData.data.Post.node }] }
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
    name: 'allPosts',
    props: props => ({
      subscribeToPosts: subscribeToPosts(props)
    }),
  }),
  graphql(FeedQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(ListPage);
