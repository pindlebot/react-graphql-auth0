import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'
import uuid from 'uuid/v4'
import { APP_PATH, PROFILE_PATH } from '../../lib/config'

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

export default class Navbar extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    lock: PropTypes.object,
    history: PropTypes.object.isRequired
  }

  handleLogout = () => {
    window.localStorage.removeItem('auth0IdToken')
    window.location.reload()
  };

  createAvatarUrl = () => {
    const uid = uuid()
    const name = !this.props.data.loading && this.props.data.user ? this.props.data.user.name : uid
    return `https://avatar.tobi.sh/${name.replace('-', '').replace(' ', '')}`
  }

  render () {
    const isLoggedIn = !!this.props.data.user
    if (this.props.data.loading) {
      return false
    }

    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div>
          <div>
            <Avatar src={this.createAvatarUrl()} className='mh3' />
            <DownArrow color='white' />
          </div>
        </div>
      </IconButton>
    )

    const noAuthMenu = (
      <FlatButton
        label='Login/Sign Up'
        onClick={() => { this.props.lock.show() }}
        style={{ color: 'white' }}
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
          onClick={() => { this.props.history.push(PROFILE_PATH) }}
        />
        <MenuItem
          primaryText='Tasks'
          onClick={() => {}}
        />
        <MenuItem
          primaryText='Sign out'
          onClick={this.handleLogout}
        />
      </IconMenu>
    ) : noAuthMenu

    return (
      <AppBar
        title={<span style={{ cursor: 'pointer' }}>{'Graphcool + Auth0'}</span>}
        onClick={() => { this.props.history.push(APP_PATH) }}
        showMenuIconButton={false}
        iconElementRight={AppBarMenu}
      />
    )
  }
}
