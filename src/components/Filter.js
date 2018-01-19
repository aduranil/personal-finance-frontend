import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button } from 'semantic-ui-react'
import _ from 'lodash'
let transactions

class Filter extends React.Component {
  state = {
    category_name: [],
    merchant_name: [],
    account_name: [],
    period_name: []
  }
  filterData = () => {
    let categoryFilter = []
    if (this.props.user.category_name) {
      this.props.user.category_name.map((category, index) => {
        categoryFilter.push({key: index, text: category, value: category, id:category, name: category, name2: 'category_name'})
      })
    }
    return categoryFilter
  }

  categoryFilters = (event) => {
    let state = this.state
    let name
    if (event.currentTarget.className === 'delete icon') {
      name = event.currentTarget.offsetParent.children[event.currentTarget.offsetParent.children.length-1].childNodes[0].attributes[2].nodeValue
      let value = event.currentTarget.offsetParent.children[event.currentTarget.offsetParent.children.length-1].childNodes[0].attributes[0].nodeValue
      this.setState({[name]: state[name].filter(name => name !== event.currentTarget.parentElement.outerText)})
    } else {
      name = event.currentTarget.attributes[2].nodeValue
      this.setState({[name]: state[name].concat([event.currentTarget.id]) })
    }
  }

  filterTransactions = (event) => {
    let state = this.state

    let filteredTransactions = this.props.user.transactions.filter(transaction=> {
      return state.category_name.includes(transaction.category_name) && state.account_name.includes(transaction.account_name) && state.merchant_name.includes(transaction.merchant_name) && state.period_name.includes(transaction.period_name)
    })
    console.log(filteredTransactions)
    this.props.filterTransactions(filteredTransactions)

  }


  render(){
    let data = this.filterData()
    let accountNames = []
    let merchantNames = []
    let periodNames = []
    if (this.props.user.category_name) {
      this.props.accounts.map((account, index) => {
        accountNames.push({key: index, text: account.name, value: account.name, id:account.name, name: account.name, name2: 'account_name'})
      })
    }
    if (this.props.user.merchant_name) {
      this.props.user.merchant_name.map((merchant, index) => {
        merchantNames.push({key: index, text: merchant, value: merchant, id:merchant, name: merchant, name2: 'merchant_name'})
      })
    }
    let dates = [...new Set(this.props.user.transactions.map(transaction => transaction.period_name))]
    dates.map((date, index) => {
      periodNames.push({key: index, text: date, value: date, id:date, name: date, name2: 'period_name'})
    })
    console.log('dates array', dates)
    console.log('props in filter',this.props)
    console.log('state in filter', this.state)
    return (
      <div>
        <Dropdown placeholder='Category' onChange={this.categoryFilters} value={this.state.category_name} fluid multiple search selection options={data} />
        <Dropdown placeholder='Merchant' onChange={this.categoryFilters} fluid multiple search selection options={merchantNames} />
        <Dropdown placeholder='Account' onChange={this.categoryFilters} fluid multiple search selection options={accountNames} />
        <Dropdown placeholder='Period' onChange={this.categoryFilters} fluid multiple search selection options={periodNames} />
        <Button onClick={this.filterTransactions}> Filter</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    categories: state.auth.categories,
    accounts: state.accounts.accounts
  }
}
export default connect(mapStateToProps, actions)(Filter);
