import React from 'react'
import propTypes from 'prop-types'
import ListPage from '../../components/ListPage'
import Layout from '../Layout'

export default class App extends React.Component {
  static propTypes = {
    history: propTypes.object.isRequired,
    data: propTypes.object.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.user) {
      return (
        <Layout {...this.props}>
          <div className='w-80 flex flex-column center'>
            <ListPage {...this.props} />
          </div>
        </Layout>
      )
    }
    return (
      <Layout {...this.props} />
    )
  }
}
