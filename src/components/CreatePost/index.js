import { graphql, compose } from 'react-apollo'
import CreatePost from './CreatePost'
import gql from 'graphql-tag'

const createPost = gql`
  mutation createPost($comment: String!, $userId: ID!) {
    createPost(
      comment: $comment
      userId: $userId
    ) {
      id
    }
  }
`

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`

export default compose(
  graphql(createPost, {
    props: ({ mutate }) => ({
      createPost: ({ comment, userId }) => mutate({ variables: { comment, userId } })
    })
  }),
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' }
  })
)(CreatePost)
