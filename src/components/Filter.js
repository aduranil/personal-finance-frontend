import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button } from 'semantic-ui-react'

class Filter extends React.Component {
  state = {
    category_name: [],
    merchant_name: [],
    account_name: [],
    period_name: []
  }

  categoryFilters = (event) => {
    let state = this.state
    let domName = event.currentTarget.offsetParent.children
    let domItem = event.currentTarget
    let name
    if (domItem.className === 'delete icon') {
      name = domName[domName.length-1].childNodes[0].attributes[2].nodeValue
      this.setState({[name]: state[name].filter(name => name !== domItem.parentElement.outerText)})
    } else {
      name = domItem.attributes[2].nodeValue
      this.setState({[name]: state[name].concat([domItem.id]) })
    }
  }

  filterTransactions = (event) => {
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

    console.log('props in filter',this.props)
    console.log('state in filter', this.state)
    return (
      <div>
        <Dropdown placeholder='Category' onChange={this.categoryFilters} fluid multiple search selection options={this.props.category_name} />
        <Dropdown placeholder='Merchant' onChange={this.categoryFilters} fluid multiple search selection options={this.props.merchant_name} />
        <Dropdown placeholder='Account' onChange={this.categoryFilters} fluid multiple search selection options={this.props.accountOptions} />
        <Dropdown placeholder='Period' onChange={this.categoryFilters} fluid multiple search selection options={this.props.periodOptions} />
        <Button type='submit' onClick={this.filterTransactions}> Filter</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser.transactions,
    filtered: state.auth.filtered,
    periods: state.auth.periods,
    periodOptions: state.auth.periodOptions,
    category_name: state.auth.category_name,
    merchant_name: state.auth.merchant_name,
    accountOptions: state.auth.accountOptions

  }
}
export default connect(mapStateToProps, actions)(Filter);
