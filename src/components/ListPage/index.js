import { graphql, compose, withApollo } from 'react-apollo'
import ListPage from './ListPage'
import gql from 'graphql-tag'

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const postQuery = gql`
  query postQuery {
    allPosts(orderBy: createdAt_DESC) {
      id
      comment
      createdAt
      user {
        name
        id
      }
    }
  }
`

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
          id
        }
      }
      previousValues {
        id
      }
    }
  }
`

const subscribeToPosts = (props) => {
  return {
    document: POSTS_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {subscriptionData}) => {
      var post = subscriptionData.data.Post
      if (!post.node) {
        var {id} = post.previousValues
        return { allPosts: [...prev.allPosts.filter(x => x.id !== id)] }
      }
      return { allPosts: [...prev.allPosts, { ...post.node }] }
    }
  }
}

export default withApollo(compose(
  graphql(deletePost, {
    props: ({ ownProps, mutate }) => ({
      deletePost: ({ id }) => mutate({ variables: { id } })
    })
  }),
  graphql(postQuery, {
    props: props => ({
      subscribeToPosts: subscribeToPosts(props)
    })
  }),
  graphql(postQuery, {
    options: { fetchPolicy: 'network-only' }
  })
)(ListPage))
