import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import Btn from '../Btn';
import Input from '../Input';
import PropTypes from 'prop-types';

export default class CreatePost extends React.Component {
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
        <div style={{ maxWidth: 400 }} className="">
          <Input
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <Input
            placeholder="Description"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
          />
          {this.state.description && this.state.title &&
            <Btn>
              <span
                onClick={this.handlePost}
              >
                Post
              </span>
            </Btn>
          }
        </div>
      </div>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func,
  data: PropTypes.object,
};
