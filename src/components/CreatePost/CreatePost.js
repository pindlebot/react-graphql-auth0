import React from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

export default class CreatePost extends React.Component {

  static propTypes = {
    createPost: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      description: '',
      title: '',
    };

    this.handlePost = this.handlePost.bind(this);
  }

  handlePost() {
    const { description, title } = this.state;
    this.props.createPost({ description, title });
  }

  render() {
    const { data: { loading, user }, createPost } = this.props;
    const { title, description } = this.state;
    if (loading) {
      return (<div>Loading</div>);
    }

    // redirect if no user is logged in
    if (!user) {
      return (
        <Redirect to={{
          pathname: '/',
        }}
        />
      );
    }

    return (
      <div className="w-100 pa4 flex justify-center">
        <Paper zDepth={1} style={{ maxWidth: 400 }} className="pa3">
          <TextField
            fullWidth
            id="title"
            placeholder="Title"
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <TextField
            fullWidth
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          {this.state.description && this.state.title &&
            <FlatButton
              label="Post"
              onTouchTap={this.handlePost}
            />
          }
        </Paper>
      </div>
    );
  }
}
