import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        >
          Dashboard
        </Menu.Item>

        <Menu.Item
          name='Trends'
          active={activeItem === 'Trends'}
          onClick={this.handleItemClick}
        >
          Trends
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withAuth(NavBar);
