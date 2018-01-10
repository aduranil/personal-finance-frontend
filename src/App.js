import React, { Component } from 'react';
import { Link, Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import HomepageLayout from './containers/loggedOut'
import * as actions from './actions'
import Login from './containers/Login'

class App extends Component {

  render() {
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

export default connect(mapStateToProps, actions)(App)
