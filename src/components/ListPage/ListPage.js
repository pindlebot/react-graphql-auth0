import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';
import CreatePost from '../CreatePost';


class ListPage extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this);
  }

  componentWillMount() {

  }
  
  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newProps.data.allPosts !== this.props.data.allPosts) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription()
        } else {
          // we already have an active subscription with the right params
          return
        }
      }
      this.subscription = newProps.subscribeToPosts
    }
  }

  deletePost(id) {
    this.props.deletePost(id).then((resp) => {
      //this.props.client.resetStore();
    });
  }

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>);
    }
    console.log(this.props);

    return (
      <div>
        <div>
          {this.props.data.allPosts.map(post =>
            (<Post
              key={post.id}
              post={post}
              handleClick={this.deletePost}
            />),
          )}
        </div>
        <CreatePost />
      </div>
    );
  }
}


export default ListPage;
