import React from 'react'
import { graphql, gql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import LoginAuth0 from '../../components/LoginAuth0'
import ListPage from '../../components/ListPage'
import NewPostLink from '../../components/NewPostLink'
import config from '../../config'
import PropTypes from 'prop-types'
import './style.css'
import Header from '../../components/Header'
import subscription from './subscription'
import Input from '../../components/Input'
import Btn from '../../components/Btn'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.createUser = this.createUser.bind(this)

    this.state = {
      name: ''
    }
  }

  async createUser(profile) {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      emailAddress: profile.email,
      name: profile.name,
      emailSubscription: true
    }

    var resp = await this.props.createUser({ variables })  
    this.props.client.resetStore()
  }

  componentDidMount() {
    this.props.lock.on('authenticated', (authResult) => { 
      window.localStorage.setItem('auth0IdToken', authResult.idToken)
      this.props.client.resetStore();
      this.props.saveAccessToken(authResult.accessToken)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (!nextProps.data.loading) {
      if(nextProps.accessToken && !nextProps.data.user) {
        this.props.lock.getUserInfo(nextProps.accessToken, (err, profile) => {
          console.log(profile)
          this.createUser(profile)
        })
      } 

      if(nextProps.data.user) {
        this.setState({name: nextProps.data.user.name})
      }

      if (this.subscription) {
        if (nextProps.data.user !== this.props.data.user) {
          this.subscription()
        } else {
          return
        }
      } 
      
      this.subscription = nextProps.data.subscribeToMore(subscription) 
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
            lock={this.props.lock}
          />
          <div className='w-100 flex flex-row'>
            <div className='w-20 flex flex-column items-center pa3'>
            
              <div className="ma1">
                <Input 
                placeholder="Title"
                value={this.state.name} 
                onChange={e => this.setState({name: e.target.value})}
                />

                <Btn><span 
                  onClick={() => { 
                    this.props.updateUser({
                      name: this.state.name, 
                      id: this.props.data.user.id
                    }) 
                  }}>
                    Update
                  </span>
                </Btn>
              </div>
            </div>
            <div className='w-80 flex flex-column'>
              <p>{JSON.stringify(this.props.data.user ? this.props.data.user : {})}</p>
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
          lock={this.props.lock}
        />
      )
    }
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}
