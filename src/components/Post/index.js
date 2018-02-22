import React from 'react'
import propTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import DeleteBtn from 'material-ui/svg-icons/action/delete'
import Avatar from 'material-ui/Avatar'

const createAvatarUrl = (name) => {
  return `https://avatar.tobi.sh/${name.replace('-', '').replace(' ', '')}`
}

const meta = {
  color: 'rgba(205, 213, 209, 1)',
  fontSize: '12px'
}

export const Post = ({ post, handleClick, user }) => {
  return (
    <div className='flex flex-row justify-between mv1'>
      <div className='flex flex-row items-center'>
        <Avatar size={25} src={createAvatarUrl(post.user.name)} className='mh3' />
        <span>{post.user.name}</span>: <span>{post.comment}</span>
      </div>
      <div>
        <span style={meta}>{post.createdAt}</span>
        <FlatButton
          icon={<DeleteBtn />}
          onClick={() => { handleClick({ id: post.id }) }}
        />
      </div>
    </div>
  )
}

Post.propTypes = {
  post: propTypes.object.isRequired,
  handleClick: propTypes.func.isRequired
}

export default Post
