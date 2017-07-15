import Auth0Lock from 'auth0-lock'
const config = require('./config')

const SET_TOKEN_ID = 'SET_TOKEN_ID'
const APPLY_MIDDLEWARE = 'APPLY_MIDDLEWARE'

function tokenIdReducer(idToken) {
  return {
    type: SET_TOKEN_ID,
    idToken
  }
}

const initialState = {
  idToken: null
}

function appReducer(state = initialState, action) {
  switch(action.type) {     
    case SET_TOKEN_ID:
      return Object.assign({}, state, {
        idToken: action.idToken
      })
  
    default: 
      return state
  }
}

module.exports = {
  tokenIdReducer,
  appReducer
}