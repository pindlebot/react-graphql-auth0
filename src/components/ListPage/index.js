import { graphql, gql } from 'react-apollo'
import ListPage from './ListPage'

const FeedQuery = gql`query FeedQuery {
  allPosts(orderBy: createdAt_DESC) {
    id
    title
    description
  }
}`

export default graphql(FeedQuery, { options: {fetchPolicy: 'network-only'}})(ListPage)