import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../components/Btn'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const Post = ({post, handleClick}) => (
  <Paper zDepth={1} className="pa3 ma3">
    <h2>{post.title}</h2>
    <p>{post.description}</p>
    <p>id: {post.id}</p>
    <FlatButton 
    label={'Delete'}
    onTouchTap={() => { handleClick({id: post.id}) }}
    />
  </Paper>
);

Post.propTypes = {
  post: PropTypes.object,
};

export default Post