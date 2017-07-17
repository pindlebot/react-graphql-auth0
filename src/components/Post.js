import React from 'react';
import propTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

const Post = ({ post, handleClick }) => (
  <Paper zDepth={1} className="pa3 ma3">
    <h2>{post.title}</h2>
    <p>{post.description}</p>
    <p>id: {post.id}</p>
    <FlatButton
      label={'Delete'}
      onTouchTap={() => { handleClick({ id: post.id }); }}
    />
  </Paper>
);

Post.propTypes = {
  post: propTypes.object.isRequired,
  handleClick: propTypes.func.isRequired
};

export default Post;
