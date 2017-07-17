import React from 'react';
import propTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Layout from '../Layout';

const UserForm = props => (
  <div className="ma1">
    <Paper zDepth={1} className="ma4 pa4">
      <TextField
        fullWidth
        id="name"
        placeholder="Name"
        value={props.name}
        onChange={(e) => {
          props.handleChange(e, 'name');
        }}
      />
      <TextField
        fullWidth
        id="emailAddress"
        placeholder="Email"
        value={props.emailAddress}
        onChange={(e) => {
          props.handleChange(e, 'emailAddress');
        }}
      />
    </Paper>
    <FlatButton
      label="Update"
      onTouchTap={() => {
        props.updateUser({
          name: props.name,
          id: props.id,
          emailAddress: props.emailAddress,
        });
      }}
    />
  </div>
);

class Profile extends React.Component {
  static propTypes = {
    data: propTypes.object.isRequired,
    updateUser: propTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        emailAddress: '',
      },
    };

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user && nextProps.data.user !== this.props.data.user) {
      const formData = {
        name: nextProps.data.user.name,
        emailAddress: nextProps.data.user.emailAddress,
      };
      this.setState({
        formData,
      });
    }
  }

  handleChange (e, id) {
    const formData = this.state.formData;
    formData[id] = e.target.value;
    this.setState({formData})            
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }
    return (
      <Layout {...this.props}>
        <div className="w-100 flex flex-row justify-center">
          {this.props.data
            ? <UserForm
              name={this.state.formData.name}
              emailAddress={this.state.formData.emailAddress}
              id={this.props.data.user.id}
              handleChange={this.handleChange}
              updateUser={this.props.updateUser}
            />
            : ''}
        </div>
      </Layout>
    );
  }
}
export default Profile;
