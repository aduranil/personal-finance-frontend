import React, { Component } from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import HomepageLayout from './containers/loggedOut'
import * as actions from './actions'
import Login from './containers/Login'

class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/' component={HomepageLayout}/>
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
})

export default withRouter(connect(mapStateToProps, actions)(App))
