import React from 'react'
import { Link } from 'react-router-dom'
import Btn from './Btn'

export default class NewPostLink extends React.Component {
  render() {
    return (
      <Btn>
        <Link to='/' className='no-underline white'>
          New Post
        </Link>
      </Btn>
    )
  }
}
