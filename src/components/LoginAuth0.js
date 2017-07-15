import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import config from '../config';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';

class LoginAuth0 extends Component {
  render() {
    return (
      <div>
        <span
          onClick={() => { this.props.lock.show(); }}
          className="br2 ba b--mid-gray dib pa2 mid-gray dim pointer"
        >Log in with Auth0
        </span>
      </div>
    );
  }
}

LoginAuth0.propTypes = {
  history: PropTypes.object,
};

export default LoginAuth0;
