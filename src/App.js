import React, { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import HomepageLayout from './containers/loggedOut'
import * as actions from './actions'

class App extends Component {

  render() {
    console.log(this.props)
    return (
      <div className="App">
      {this.props.loggedIn ? (
        <li> you are logged in </li>
      ) : (
        <HomepageLayout/>
      )}
      <Switch>
        <Route path="/login"/>
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.auth.currentUser.id
})

export default connect(mapStateToProps, actions)(App)
