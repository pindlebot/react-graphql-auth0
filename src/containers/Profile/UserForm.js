import React from 'react'
import propTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'

const UserForm = props => (
  <div className='ma1'>
    <Paper zDepth={1} className='ma4 pa4'>
      <TextField
        fullWidth
        id='name'
        placeholder='Name'
        value={props.name}
        onChange={(e) => {
          props.handleChange(e, 'name')
        }}
      />
      <TextField
        fullWidth
        id='emailAddress'
        placeholder='Email'
        value={props.emailAddress}
        onChange={(e) => {
          props.handleChange(e, 'emailAddress')
        }}
      />
    </Paper>
    <FlatButton
      label='Update'
      onClick={() => {
        props.updateUser({
          name: props.name,
          id: props.id,
          emailAddress: props.emailAddress
        })
      }}
    />
  </div>
)

UserForm.propTypes = {
  name: propTypes.string,
  id: propTypes.string,
  emailAddress: propTypes.string,
  updateUser: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired
}

export default UserForm
