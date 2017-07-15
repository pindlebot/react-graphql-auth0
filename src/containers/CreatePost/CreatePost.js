import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { graphql, gql } from 'react-apollo'
import Btn from '../../components/Btn'
import Input from '../../components/Input'

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: '',
      title: '',
    }

    this.handlePost = this.handlePost.bind(this)
  }

  handlePost() {
    const {description, title} = this.state
    this.props.createPost({description, title})
  }

  render () {
    var {data: {loading, user}, createPost} = this.props
    var {title, description} = this.state
    if (loading) {
      return (<div>Loading</div>)
    }

    // redirect if no user is logged in
    if (!user) {
      return (
        <Redirect to={{
          pathname: '/'
        }}/>
      )
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <Input 
            placeholder="Title"
            value={this.state.title} 
            onChange={e => this.setState({title: e.target.value})}
          />
          <Input 
            placeholder="Description"
            value={this.state.description} 
            onChange={e => this.setState({description: e.target.value})}
          />
          {this.state.description && this.state.title &&
            <Btn>
              <span 
               onClick={this.handlePost}>
                Post
              </span>
            </Btn>
          }
        </div>
      </div>
    )
  }
}

CreatePost.propTypes = {
  createPost: React.PropTypes.func,
  data: React.PropTypes.object,
}