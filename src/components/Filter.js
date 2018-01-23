import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button, Grid, Header} from 'semantic-ui-react'

class Filter extends React.Component {
  categoryFilters = (event) => {
    let props = this.props.filters
    let domName = event.currentTarget.offsetParent.children
    let domItem = event.currentTarget
    let name
    if (domItem.className === 'delete icon') {
      name = domName[domName.length-1].childNodes[0].attributes[2].nodeValue
      this.props.filter({[name]: props[name].filter(name => name !== domItem.parentElement.outerText)})
    } else {
      name = domItem.attributes[2].nodeValue
      this.props.filter({[name]: props[name].concat([domItem.id]) })
    }
  }

  filterTransactions = (event) => {
    let props = this.props.filters
    let filteredTransactions = this.props.user.filter(transaction=> {
      return (
        (props.category_name.includes(transaction.category_name)||props.category_name.length===0) &&
        (props.account_name.includes(transaction.account_name)||props.account_name.length===0) &&
        (props.merchant_name.includes(transaction.merchant_name)||props.merchant_name.length===0) &&
        (props.period_name.includes(transaction.period_name)||props.period_name.length===0)
      )
    })
    this.props.filterByMany(filteredTransactions,event)
  }

  render(){
    console.log(this.props.filters)
    return (
      <Grid style={{padding: '0em 2em 2em 2em'}}>
        <Grid.Row>
          <Header as='h3'>Filters</Header>
        </Grid.Row>
        <Grid.Row>
          <Dropdown placeholder='Category' onChange={this.categoryFilters} fluid multiple search selection options={this.props.cat_name}
          value={this.props.filters.category_name} />
        </Grid.Row>
        <Grid.Row>
          <Dropdown placeholder='Merchant' onChange={this.categoryFilters} fluid multiple search selection options={this.props.merch_name}
            value={this.props.filters.merchant_name}
          />
        </Grid.Row>
        {this.props.name === 'All'? <Grid.Row>
          <Dropdown placeholder='Account' onChange={this.categoryFilters} fluid multiple search selection options={this.props.accountOptions}
          value={this.props.filters.account_name} />
        </Grid.Row> : null}
        <Grid.Row>
          <Dropdown placeholder='Period' onChange={this.categoryFilters} fluid multiple search selection options={this.props.periodOptions}
          value={this.props.filters.period_name}
          />
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
    cat_name: state.auth.category_name,
    merch_name: state.auth.merchant_name,
    accountOptions: state.auth.accountOptions,
    name: state.auth.name,
    filters: state.filter
  }
}

export default connect(mapStateToProps, actions)(Filter);
