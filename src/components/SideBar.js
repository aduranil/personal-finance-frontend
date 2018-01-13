import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SideBar extends React.Component {
  state = { activeItem: 'home'}

  handleItemClick = (e, { name }) => {
    e.preventDefault()
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
        {this.props.user.accounts !== undefined && this.props.user.accounts.length > 0 ?  <Menu.Item name='All' onClick={this.handleItemClick}  active={this.state.activeItem === 'All'}/> : null}
        {this.renderAccounts()}
        <Menu.Item><Button color='olive'>Add Account</Button></Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user: state.auth.currentUser,
    loading: state.auth.isLoading,
  }
}

export default connect(mapStateToProps, actions)(SideBar);