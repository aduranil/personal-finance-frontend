import React from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SideBar extends React.Component {
  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name})
    this.props.selectAccount(e.target.id)
  }

  renderAccounts = () => {
    const { activeItem } = this.state
    if (this.props.user.accounts) {
      return this.props.user.accounts.map(account => {
        return <Menu.Item name={account.name} onClick={this.handleItemClick} active={activeItem === account.name} id={account.id} key={account.id}/>
      })
    } else {
      return <div/>
    }
  }

  render() {

    return (
      <Menu pointing secondary vertical>
        <Menu.Item as='h4'>Your Accounts</Menu.Item>
        <Menu.Item name='All' onClick={this.handleItemClick} active={this.state.activeItem === 'All'}/>
        {this.renderAccounts()}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user: state.auth.currentUser,
    loading: state.auth.isLoading,
    active_account: state.accounts.active_account
  }
}

export default connect(mapStateToProps, actions)(SideBar);
