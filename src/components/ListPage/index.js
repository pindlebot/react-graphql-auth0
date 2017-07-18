import { graphql, gql, compose } from 'react-apollo';
import ListPage from './ListPage';

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const postQuery = gql`
  query postQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      comment
      createdAt
      user {
        name
      }
    }
  }
`;

const POSTS_SUBSCRIPTION = gql`
  subscription {
    Post(filter: { mutation_in: [CREATED, DELETED] }) {
      mutation
      node {
        id
        comment
        createdAt
        user {
          name
        }
      }
      previousValues {
        id
      }
    }
  }
`

const subscribeToPosts = (props) => {
  return props.data.subscribeToMore({
    document: POSTS_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {subscriptionData}) => { 
      var post = subscriptionData.data.Post
      switch(true) {
        case !subscriptionData.data: 
          return prev
          
        case !post.node: 
          var {id} = post.previousValues
          var filtered = prev.allPosts.filter(x => x.id !== id)
          return { allPosts: [...filtered] }
          
        case !prev.allPosts.find(post => post.id === subscriptionData.data.Post.node.id):
          return { allPosts: [...prev.allPosts, { ...post.node }] }
          
        default: 
          return prev
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
  graphql(postQuery, {
    props: props => ({
      subscribeToPosts: subscribeToPosts(props)
    }),
  }),
  graphql(postQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
)(ListPage);
