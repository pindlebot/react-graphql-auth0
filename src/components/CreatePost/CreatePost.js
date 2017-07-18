import React from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import keydown from 'react-keydown';

export default class CreatePost extends React.Component {

  static propTypes = {
    createPost: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    };

    this.handlePost = this.handlePost.bind(this);
    this.submitComment = this.submitComment.bind(this)
  }

  @keydown( 'enter' ) // or specify `which` code directly, in this case 13 
  submitComment( event ) {
    this.handlePost()
  }

  handlePost() {
    const { comment } = this.state;
    this.props.createPost({ comment, userId: this.props.data.user.id });
  }

  render() {
    const { data: { loading, user }, createPost } = this.props;
    const { comment } = this.state;
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
      <div className="w-100">
        <Paper zDepth={1} className="pa3 w-100 flex flex-row justify-between">
          <TextField
            //fullWidth
            onKeyDown={ this.submitComment }
            id="comment"
            placeholder="comment"
            value={comment}
            onChange={e => this.setState({ comment: e.target.value })}
          />
      
        
          <RaisedButton
            style={{boxShadow: 'none'}}
            label="Submit"
            primary={true}
            onTouchTap={this.handlePost}
          />
          
        </Paper>
      </div>
    );
  }
}
