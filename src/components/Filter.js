import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button } from 'semantic-ui-react'
import _ from 'lodash'

let accounts
let periods
let categories
let merchants

class Filter extends React.Component {
  state = {
    category_name: [],
    merchant_name: [],
    account_name: [],
    period_name: []
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
    event.preventDefault()
    let state = this.state
    let filteredTransactions = this.props.user.filter(transaction=> {
      return (
        (state.category_name.includes(transaction.category_name)||state.category_name.length===0) &&
        (state.account_name.includes(transaction.account_name)||state.account_name.length===0) &&
        (state.merchant_name.includes(transaction.merchant_name)||state.merchant_name.length===0) &&
        (state.period_name.includes(transaction.period_name)||state.period_name.length===0)
      )
    })
    console.log(filteredTransactions)
    this.props.filterTransactions(filteredTransactions)

  }


  render(){
    let accountNames = []
    let merchantNames = []
    let periodNames = []
    let categoryNames = []

    accounts = [...new Set(this.props.user.map(transaction => transaction.account_name))]
    periods = [...new Set(this.props.user.map(transaction => transaction.period_name))]
    categories = [...new Set(this.props.user.map(transaction => transaction.category_name))]
    merchants = [...new Set(this.props.user.map(transaction => transaction.merchant_name))]
    periods.map((date, index) => {
      periodNames.push({key: index, text: date, value: date, id:date, name: date, name2: 'period_name'})
    })
    accounts.map((account, index) => {
      accountNames.push({key: index, text: account, value: account, id:account, name: account, name2: 'account_name'})
    })
    merchants.map((merchant, index) => {
      merchantNames.push({key: index, text: merchant, value: merchant, id:merchant, name: merchant, name2: 'merchant_name'})
    })
    categories.map((category, index) => {
      categoryNames.push({key: index, text: category, value: category, id:category, name: category, name2: 'category_name'})
    })
    console.log('props in filter',this.props)
    console.log('state in filter', this.state)
    return (
      <div>
        <Dropdown placeholder='Category' onChange={this.categoryFilters} fluid multiple search selection options={categoryNames} />
        <Dropdown placeholder='Merchant' onChange={this.categoryFilters} fluid multiple search selection options={merchantNames} />
        <Dropdown placeholder='Account' onChange={this.categoryFilters} fluid multiple search selection options={accountNames} />
        <Dropdown placeholder='Period' onChange={this.categoryFilters} fluid multiple search selection options={periodNames} />
        <Button type='submit' onClick={this.filterTransactions}> Filter</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser.transactions
  }
}
export default connect(mapStateToProps, actions)(Filter);
