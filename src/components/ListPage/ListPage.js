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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      if (nextProps.data.allPosts !== this.props.data.allPosts) {
        this.props.subscribeToPosts()
      } else {
        return;
      }
    }
  }

  deletePost(id) {
    this.props.deletePost(id).then((resp) => {
      this.props.client.resetStore();
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
