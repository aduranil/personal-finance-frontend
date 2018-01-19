import React from 'react'
import { Menu} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
    }
  }

  handleItemClick = (event, { name }) => {
    this.setState({activeItem: name})
    let state = this.state
    console.log(event.currentTarget.id)
    let filteredTransactions = this.props.user.transactions.filter(transaction=> {
      return (
        event.currentTarget.id.includes(transaction.account_name)
      )
    })
    console.log(filteredTransactions)
    this.props.filterTransactions(filteredTransactions, event)
  }

  renderAccounts = () => {
    const { activeItem } = this.state
    return this.props.accountOptions.map(account => {
      return <Menu.Item name={account.id} onClick={this.handleItemClick} active={activeItem === account.name} id={account.id} name2={account.name3} key={account.id}/>
    })
  }

  render() {
    return (
      <div>
        <Menu secondary vertical>
          <Menu.Item as='h4'>Your Accounts</Menu.Item>
          {this.props.user.accounts && this.props.user.accounts.length > 0 ?
            <Menu.Item
              name='All'
              onClick={this.handleItemClick}  active={this.state.activeItem === 'All'}
              id='10000'
            />
          : null}
          {this.renderAccounts()}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    accountOptions: state.auth.accountOptions
  }
}

export default connect(mapStateToProps, actions)(SideBar);
