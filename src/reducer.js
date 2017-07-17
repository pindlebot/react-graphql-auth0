import Auth0Lock from 'auth0-lock';
import config from './config';

const SET_TOKEN_ID = 'SET_TOKEN_ID';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';

function tokenIdReducer(idToken) {
  return {
    type: SET_TOKEN_ID,
    idToken,
  };
}

function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile,
  };
}

function saveAccessToken(accessToken) {
  return {
    type: SAVE_ACCESS_TOKEN,
    accessToken,
  };
}

const initialState = {
  idToken: null,
  profile: null,
  accessToken: null,
  lock: new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN),
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN_ID:
      return Object.assign({}, state, {
        idToken: action.idToken,
      });
    case UPDATE_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });
    case SAVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken,
      });
    default:
      return state;
  }
}

module.exports = {
  tokenIdReducer,
  updateProfile,
  saveAccessToken,
  appReducer,
};
