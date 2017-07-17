import React from 'react'
import Header from '../../components/Header'

class Layout extends React.Component {
  render() {
    return(
      <div>
        <Header
          data={this.props.data}
          history={this.props.history}
          lock={this.props.lock}
        />
        <div className="content">
        {this.props.children}
        </div>
        <div className="footer"></div>
      </div>
    )
  }
}
export default Layout
