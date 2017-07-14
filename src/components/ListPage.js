import React from 'react'
import Post from '../components/Post'
import { graphql, gql } from 'react-apollo'

class ListPage extends React.Component {

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        {this.props.data.allPosts.map((post) =>
          <Post key={post.id} post={post} />
        )}
      </div>
    )
  }
}

const FeedQuery = gql`query FeedQuery {
  allPosts(orderBy: createdAt_DESC) {
    id
    title
    description
  }
}`

ListPage.propTypes = {
  data: React.PropTypes.object,
}

export default graphql(FeedQuery, { options: {fetchPolicy: 'network-only'}})(ListPage)
