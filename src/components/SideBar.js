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


  componentDidMount() {
    this.props.fetchAccounts()
  }

  renderAccounts = () => {
    const { activeItem } = this.state
    const accounts = this.props.accounts.filter(account => account.user_id === this.props.user_id)
    return accounts.map(account => {
      return <Menu.Item name={account.name} onClick={this.handleItemClick} active={activeItem === account.name} id={account.id} key={account.id}/>
    })
  }

  render() {
    console.log(this.props)
    return (
      <Menu pointing secondary vertical>
        <Menu.Item as='h4'>Your Accounts</Menu.Item>
        <Menu.Item name='All' onClick={this.handleItemClick} active={this.state.activeItem === 'All'}/>
        {this.renderAccounts()}
      </Menu>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user_id: state.auth.currentUser.id,
    accounts: state.accounts.accounts,
    loading: state.auth.isLoading,
    active_account: state.accounts.active_account
  }
}

export default connect(mapStateToProps, actions)(SideBar);
