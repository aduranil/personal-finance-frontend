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
    this.props.activeItem(1, event)
    this.props.removeFilterLabel()
    let filteredTransactions = this.props.user.transactions.filter(transaction=> {
      return (
        event.currentTarget.id.includes(transaction.account_name)
      )
    })
    this.props.filterTransactions(filteredTransactions, event)
  }

  renderAccounts = () => {
    const { activeItem } = this.state
    return this.props.accountOptions.map(account => {
      return <Menu.Item name={account.text} onClick={this.handleItemClick} active={activeItem === account.text} id={account.id} name2={account.name} key={account.name}/>
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Menu size='small' pointing secondary vertical color='grey'>
          <Menu.Item as='h4'>Your Accounts</Menu.Item>
          {this.props.user.accounts && this.props.user.accounts.length > 0 ?
            <Menu.Item
              name='All'
              onClick={this.handleItemClick}  active={this.state.activeItem === 'All'}
              id='All'
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
