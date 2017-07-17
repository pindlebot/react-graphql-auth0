import React, {PureComponent} from 'react';
import propTypes from 'prop-types'
import Header from '../../components/Header';

class Layout extends PureComponent {

  static propTypes = {
    data: propTypes.object.isRequired,
    history: propTypes.object.isRequired,
    lock: propTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Header
          data={this.props.data}
          history={this.props.history}
          lock={this.props.lock}
        />
        <div className="content">
          {this.props.children}
        </div>
        <div className="footer" />
      </div>
    );
  }
}
export default Layout;
