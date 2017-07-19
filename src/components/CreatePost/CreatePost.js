import React from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import keydown from 'react-keydown';
//import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import RefreshIndicator from 'material-ui/RefreshIndicator';

const RefreshIcon = ({status}) => (
   <RefreshIndicator
    size={30}
    top={0}
    left={0} 
    loadingColor="#FF9800"
    status={status ? 'loading' : 'ready'}
    style={{
      display: 'inline-block',
      position: 'relative',
    }}
    />
)
export default class CreatePost extends React.Component {

  static propTypes = {
    createPost: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      loading: false
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
    this.setState({comment, loading: true}, () => {
      this.props.createPost({ comment, userId: this.props.data.user.id })
      .then(() => {
        this.setState({loading: false})
      })
    })
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
          <div style={{position: 'relative', margin: 'auto 10px auto 0'}}>
            <RefreshIcon status={this.state.loading} />
          </div>
          <TextField
            fullWidth
            onKeyDown={ this.submitComment }
            id="comment"
            placeholder="comment"
            value={comment}
            onChange={e => this.setState({ comment: e.target.value })}
          />
          <RaisedButton
            style={{boxShadow: 'none', marginLeft: '10px'}}
            label="Submit"
            primary={true}
            onTouchTap={this.handlePost}
          />
        </Paper>
      </div>
    );
  }
}
