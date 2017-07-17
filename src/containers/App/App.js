import React from 'react';
import PropTypes from 'prop-types';
import ListPage from '../../components/ListPage';
import './style.css';
import Header from '../../components/Header';
import subscription from './subscription';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import Layout from '../Layout'

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: '',
        emailAddress: ''
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      if (nextProps.data.user) {
        var formData = {
          name: nextProps.data.user.name, 
          emailAddress: nextProps.data.user.emailAddress 
        }
        this.setState({ 
          formData
        });
      }

      if (this.subscription) {
        if (nextProps.data.user !== this.props.data.user) {
          this.subscription();
        } else {
          return;
        }
      }

      this.subscription = nextProps.data.subscribeToMore(subscription);
    }
  }

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>);
    }

    if (this.props.data.user) {
      return (
        <Layout {...this.props}>
          <div className="w-80 flex flex-column center">
            <ListPage client={this.props.client} />
          </div>
        </Layout>
      );
    }
    return (
      <Layout {...this.props}></Layout>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
};

