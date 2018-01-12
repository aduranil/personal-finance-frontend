import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import HomepageLayout from './containers/LoggedOut'
import * as actions from './actions'
import Login from './containers/Login'
import NavBar from './components/NavBar'
import Dashboard from './containers/Dashboard'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={HomepageLayout}/>
          <Route exact path='/' component={Dashboard}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
})

export default connect(mapStateToProps, actions)(App)
