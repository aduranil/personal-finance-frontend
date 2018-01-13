import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import { connect } from "react-redux";
import * as actions from "../actions";
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
    loggedIn: !!state.auth.currentUser.id,
    user: state.auth.currentUser,
    active_account: state.accounts.active_account,
    accounts: state.accounts.accounts,
    account: state.accounts.account,
    transactions: state.transactions
  }
}

export default withAuth(connect(mapStateToProps, actions)(NavBar));
