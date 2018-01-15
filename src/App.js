import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import HomepageLayout from './containers/LoggedOut'
import * as actions from './actions'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NavBar from './components/NavBar'
import Dashboard from './containers/Dashboard'
import Trends from './containers/Trends'

class App extends Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route exact path='/logout' component={HomepageLayout}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/trends' component={Trends}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
})

export default connect(mapStateToProps, actions)(App)
