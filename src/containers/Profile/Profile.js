import React from "react";
import Layout from "../Layout";
import Input from "../../components/Input";
import Btn from "../../components/Btn";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";

const UserForm = ({ name, emailAddress, id, updateUser, onChange }) =>
  <div className="ma1">
    <Paper zDepth={1} className="ma4 pa4">
      <TextField
        fullWidth={true}
        id="name"
        placeholder="Name"
        value={name}
        onChange={e => {
          onChange(e, "name");
        }}
      />
      <TextField
        fullWidth={true}
        id="emailAddress"
        placeholder="Email"
        value={emailAddress}
        onChange={e => {
          onChange(e, "emailAddress");
        }}
      />
    </Paper>
    <FlatButton
      label="Update"
      onTouchTap={() => {
        updateUser({
          name: name,
          id: id,
          emailAddress: emailAddress
        });
      }}
    />
  </div>;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        emailAddress: ""
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user && nextProps.data.user !== this.props.data.user) {
      var formData = {
        name: nextProps.data.user.name,
        emailAddress: nextProps.data.user.emailAddress
      };
      this.setState({
        formData
      });
    }
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
                onChange={(e, id) => {
                  var formData = this.state.formData;
                  formData[id] = e.target.value;
                  this.setState({
                    formData
                  });
                }}
                updateUser={this.props.updateUser}
              />
            : ""}
        </div>
      </Layout>
    );
  }
}
export default Profile;
