import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button, Grid, Header} from 'semantic-ui-react'

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
    this.props.filterByMany(filteredTransactions,event)
  }

  render(){
    return (
      <Grid style={{padding: '0em 2em 2em 2em'}}>
        <Grid.Row>
          <Header as='h3'>Filters</Header>
        </Grid.Row>
        <Grid.Row>
          <Dropdown placeholder='Category' onChange={this.categoryFilters} fluid multiple search selection options={this.props.category_name} />
        </Grid.Row>
        <Grid.Row>
          <Dropdown placeholder='Merchant' onChange={this.categoryFilters} fluid multiple search selection options={this.props.merchant_name} />
        </Grid.Row>
        {this.props.name === 'All'? <Grid.Row>
          <Dropdown placeholder='Account' onChange={this.categoryFilters} fluid multiple search selection options={this.props.accountOptions} />
        </Grid.Row> : null}
        <Grid.Row>
          <Dropdown placeholder='Period' onChange={this.categoryFilters} fluid multiple search selection options={this.props.periodOptions} />
        </Grid.Row>
        <Grid.Row>
          <Button color='olive' type='submit' onClick={this.filterTransactions}> Filter</Button>
        </Grid.Row>
      </Grid>
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
    accountOptions: state.auth.accountOptions,
    name: state.auth.name
  }
}

export default connect(mapStateToProps, actions)(Filter);
