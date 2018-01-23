import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, {name}) => {
    this.setState({activeItem: name})
  }

  handleLogout = (event) => {
    this.setState({activeItem: event.target.name})
    this.props.logoutUser()
  }
  render() {
    const { activeItem } = this.state
    return (
      <Menu color='olive' inverted secondary style={{marginBottom: 0}}>
        <Menu.Item
          name='money'
          active={activeItem === 'money'}
          onClick={this.handleItemClick}
        >
          Hi, {this.props.user}
        </Menu.Item>
        <Menu.Item
          name='dashboard'
          as={Link}
          to='/'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          name='Trends'
          as={Link}
          to='/trends'
          active={activeItem === 'Trends'}
          onClick={this.handleItemClick}
        >
          Trends
        </Menu.Item>
        <Menu.Menu position='right'>
        {this.props.loggedIn?
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleLogout}
          /> :
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleLogout}
          />}
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser.username
  }
}

export default withAuth(connect(mapStateToProps, null)(NavBar));
