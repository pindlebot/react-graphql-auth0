import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import LoginAuth0 from '../LoginAuth0';
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import {APP_PATH, PROFILE_PATH} from '../../constants'
import uuid from 'uuid/v4'

const SIGNUP_PATH = '/'
const LOGIN_PATH = '/'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

export default class Navbar extends Component {
  static contextTypes = {
    //router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
    this.createAvatarUrl = this.createAvatarUrl.bind(this)
  }

  handleLogout = () => {
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  };

  createAvatarUrl = () => {
    var uid = uuid()
    var name = !this.props.data.loading && this.props.data.user ? this.props.data.user.name : uid
    return 'https://avatar.tobi.sh/' + name.replace('-', '').replace(' ', '')
  }

  render () {
    var isLoggedIn = this.props.data.user ? true : false
    if(this.props.data.loading) {
      return false
    }

   
    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div>
          <div>
            <Avatar src={this.createAvatarUrl()} className="mh3"/>
            <DownArrow color='white' />
          </div>
        </div>
      </IconButton>
    )

    const noAuthMenu = (
      <FlatButton
        label='Login/Sign Up'
        onTouchTap={() => { this.props.lock.show() }}
        style={{color: 'white'}}
      />
    )

    const AppBarMenu = isLoggedIn ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        animated={false}
      >
        <MenuItem
          primaryText='Account'
          onTouchTap={() => {this.props.history.push(PROFILE_PATH)}}
        />
        <MenuItem
          primaryText='Tasks'
          onTouchTap={() => {}}
        />
        <MenuItem
          primaryText='Sign out'
          onTouchTap={this.handleLogout}
        />
      </IconMenu>
    ) : noAuthMenu

    return (
      <AppBar
        title={<span style={{cursor: 'pointer'}}>{'Graphcool + Auth0'}</span>}
        onTitleTouchTap={() => {this.props.history.push(APP_PATH)}}
        showMenuIconButton={false}
        iconElementRight={AppBarMenu}
        //iconStyleRight={avatarStyles.wrapper}
      />
    )
  }
}