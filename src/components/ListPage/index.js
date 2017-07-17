import { graphql, gql, compose } from 'react-apollo';
import ListPage from './ListPage';

const deletePost = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const FeedQuery = gql`query FeedQuery {
  allPosts(orderBy: createdAt_DESC) {
    id
    title
    description
  }
}`;


export default compose(
  graphql(deletePost, {
    props: ({ownProps, mutate}) => ({
      deletePost: ({id}) => mutate({ variables: { id } })
    }),
  }),
  graphql(FeedQuery, {
    options: { fetchPolicy: 'network-only' } 
  })
)(ListPage)