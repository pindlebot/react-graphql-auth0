import Auth0Lock from 'auth0-lock'
const config = require('./config')
const createClient = require('./client')

const SET_TOKEN_ID = 'SET_TOKEN_ID'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const UPDATE_CLIENT = 'UPDATE_CLIENT'
const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN'

function tokenIdReducer(idToken) {
  return {
    type: SET_TOKEN_ID,
    idToken
  }
}

function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    profile
  }
}

function updateClient() {
  var client = createClient()
  return {
    type: UPDATE_CLIENT,
    client
  }
}

function saveAccessToken (accessToken) {
  return {
    type: SAVE_ACCESS_TOKEN,
    accessToken
  }
}

const initialState = {
  idToken: null,
  profile: null,
  accessToken: null,
  lock: new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN),
}

function appReducer(state = initialState, action) {
  switch(action.type) {     
    case SET_TOKEN_ID:
      return Object.assign({}, state, {
        idToken: action.idToken
      })
    case UPDATE_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      })
    case UPDATE_CLIENT:
      return Object.assign({}, state, {
        client: action.client
      })
    case SAVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      })
    default: 
      return state
  }
}

module.exports = {
  tokenIdReducer,
  updateProfile,
  updateClient,
  saveAccessToken,
  appReducer
}