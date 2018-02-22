import React from 'react'
import propTypes from 'prop-types'
import Layout from '../Layout'
import Spinner from '../../components/Spinner'
import UserForm from './UserForm'

class Profile extends React.Component {
  static propTypes = {
    data: propTypes.object.isRequired,
    updateUser: propTypes.func.isRequired
  }

  state = {}

  handleChange = (e, id) => {
    this.setState({ [id]: e.target.value })
  }

  render () {
    if (this.props.data.loading) {
      return <Spinner />
    }

    let { user } = this.props.data
    let { id } = user
    let emailAddress = typeof this.state.emailAddress === 'undefined'
      ? user.emailAddress
      : this.state.emailAddress

    let name = typeof this.state.name === 'undefined'
      ? user.name
      : this.state.name

    return (
      <Layout {...this.props}>
        <div className='w-100 flex flex-row justify-center'>
          {this.props.data &&
            <UserForm
              handleChange={this.handleChange}
              updateUser={this.props.updateUser}
              id={id}
              name={name}
              emailAddress={emailAddress}
            />}
        </div>
      </Layout>
    )
  }
}
export default Profile
