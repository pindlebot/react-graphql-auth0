import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withApollo, compose, graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './containers/App';
import Profile from './containers/Profile';
import theme from './theme';
import { APP_PATH, PROFILE_PATH } from './constants';
import { saveAccessToken, updateProfile } from './reducer';
import './style.css'

class Entry extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  static propTypes = {
    lock: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    saveAccessToken: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    client: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getChildContext = () => ({
    muiTheme: getMuiTheme(theme),
  });

  componentWillUnmount() {
    //this.props.subscribeToUser()
  }

  componentDidMount() {
    this.props.lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      this.props.client.resetStore().then(() => {
        this.props.saveAccessToken(authResult.accessToken);
      });
    });
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.accessToken && !nextProps.data.user) {
      const profile = await this.getUserInfo(nextProps.accessToken);
      await this.props.createUser({ variables: {
        idToken: window.localStorage.getItem('auth0IdToken'),
        emailAddress: profile.email,
        name: profile.name,
        emailSubscription: true,
      } })
      await this.props.client.resetStore()
    }
  }

  getUserInfo(accessToken) {
    return new Promise((resolve) => {
      this.props.lock.getUserInfo(accessToken, (err, profile) => {
        resolve(profile);
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path={APP_PATH} component={App} />
          <Route path={PROFILE_PATH} component={Profile} />
        </div>
      </Router>
    );
  }
}

const createUser = gql`
  mutation createUser(
    $idToken: String!, 
    $name: String!, 
    $emailAddress: String!, 
    $emailSubscription: Boolean!
  ){
    createUser(
      authProvider: {auth0: {idToken: $idToken}}, 
      name: $name, 
      emailAddress: $emailAddress, 
      emailSubscription: $emailSubscription
    ) {
      id
    }
  }
`;

const userQuery = gql`
  query userQuery {
    user {
      id
      name
      emailAddress
    }
  }
`;

const USER_SUBSCRIPTION = gql`
  subscription {
    User(filter: { mutation_in: [CREATED] }) {
      node {
        id
        name
        emailAddress
      }
    }
  }
`

const subscribeToUser = (props) => {
  return props.data.subscribeToMore({
    document: USER_SUBSCRIPTION,
    variables: null,
    updateQuery: (prev, {subscriptionData}) => {
      if (!subscriptionData.data) {
        return prev;
      }
      return { user: subscriptionData.data.User.node }
    }
  })
}


const mapStateToProps = state => ({
  lock: state.app.lock,
  profile: state.app.profile,
  accessToken: state.app.accessToken,
});

const mapDispatchToProps = dispatch => ({
  updateProfile: profile => dispatch(updateProfile(profile)),
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken)),
});

export default withApollo(compose(
  graphql(createUser, {
    props: ({ ownProps, mutate }) => ({
      createUser: variables => mutate(variables),
    }),
  }),
  graphql(userQuery, {
    options: { fetchPolicy: 'network-only' },
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(Entry));

/*
graphql(userQuery, {
    props: props => ({
      subscribeToUser: subscribeToUser(props)
    }),
  }),
*/