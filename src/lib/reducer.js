import Auth0Lock from 'auth0-lock'
import config from './config'
import { combineReducers } from 'redux'
export const SET_TOKEN_ID = 'SET_TOKEN_ID'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN'

export const tokenIdReducer = (idToken) => ({
  type: SET_TOKEN_ID,
  idToken
})

export const updateProfile = (profile) => ({
  type: UPDATE_PROFILE,
  profile

})

export const saveAccessToken = (accessToken) => ({
  type: SAVE_ACCESS_TOKEN,
  accessToken
})

export const initialState = {
  idToken: null,
  profile: null,
  accessToken: null,
  lock: new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN)
}

export function appReducer (state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN_ID:
      return { ...state, idToken: action.idToken }
    case UPDATE_PROFILE:
      return { ...state, profile: action.profile }
    case SAVE_ACCESS_TOKEN:
      return { ...state, accessToken: action.accessToken }
    default:
      return state
  }
}

export default {
  tokenIdReducer,
  updateProfile,
  saveAccessToken,
  appReducer: combineReducers({
    app: appReducer
  })
}
