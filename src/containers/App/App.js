import React from 'react'
import Auth0Lock from 'auth0-lock'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import LoginAuth0 from '../../components/LoginAuth0'
import ListPage from '../../components/ListPage'
import NewPostLink from '../../components/NewPostLink'
import config from '../../config'
import PropTypes from 'prop-types'
import './style.css'
import Header from '../../components/Header'
import { connect } from 'react-redux';
import {tokenIdReducer} from '../../reducer'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    console.log(this.props)

    this.createUser = this.createUser.bind(this)
    this.lock = new Auth0Lock(config.AUTH0_CLIENT_ID, config.AUTH0_DOMAIN)

    this.state = { profile: null }
  }

  async createUser(profile, idToken) {
    const variables = {
      idToken: idToken,
      emailAddress: profile.email,
      name: profile.name,
      emailSubscription: true
    }

    var resp = await this.props.createUser({ variables })  
    this.props.history.push(`/`)
  }

  componentDidMount() {
    this.lock.on('authenticated', (authResult) => { 
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        this.setState({profile})
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data) {
      var data = nextProps.data
      if(!data.user && this.state.profile) {
         var idToken = window.localStorage.getItem('auth0IdToken')
         this.createUser(this.state.profile, idToken)
      }
    }
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.user) {
      return (
        <div>
          <Header 
            data={this.props.data} 
            history={this.props.history}
            lock={this.lock}
          />
          <div className='w-100 flex flex-row'>
            <p>{this.props.idToken}</p>
            <div className='w-20 flex flex-column items-center pa3'>
              <NewPostLink />
            </div>
            <div className='w-80 flex flex-column'>
              <ListPage />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Header 
          data={this.props.data} 
          history={this.props.history}
          lock={this.lock}
        />
      )
    }
  }
}

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired
}
