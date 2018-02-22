import React from 'react'
import PropTypes from 'prop-types'
import Post from '../Post'
import CreatePost from '../CreatePost'
import Paper from 'material-ui/Paper'

class ListPage extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.data.loading && !this.subscription) {
      this.subscription = this.props.data.subscribeToMore(newProps.subscribeToPosts)
    }
  }

  deletePost = (id) => {
    this.props.deletePost(id).then((resp) => {
    })
  }

  render () {
    var {data: {loading, allPosts}} = this.props
    if (loading) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        <Paper zDepth={1} className='pa3 mv3'>
          {allPosts && allPosts.length > 0 ? allPosts.map(post => (<Post
            user={this.props.data.user}
            key={post.id}
            post={post}
            handleClick={this.deletePost}
          />)
          ) : ''}
        </Paper>
        <CreatePost {...this.props} />
      </div>
    )
  }
}

export default ListPage
