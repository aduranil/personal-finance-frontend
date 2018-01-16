import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleLogout = (event) => {
    this.setState({ activeItem: event.target.name })
    this.props.logoutUser()
  }
  render() {
    const { activeItem } = this.state
    return (
      <Menu color='olive' inverted secondary>
        <Menu.Item
          name='money'
          active={activeItem === 'money'}
          onClick={this.handleItemClick}
        >
          <Icon name='money'/>
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
        <Menu.Item
          name='Plaid'
          as={Link}
          to='/link'
          active={activeItem === 'Plaid'}
          onClick={this.handleItemClick}
        >
          Plaid
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

export default withAuth(NavBar);
