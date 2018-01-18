import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown, Button } from 'semantic-ui-react'
let transactions

class Filter extends React.Component {
  state = {
    category_name: []
  }
  filterData = () => {
    let categoryFilter = []
    if (this.props.user.category_name) {
      this.props.user.category_name.map((category, index) => {
        categoryFilter.push({key: index, text: category, value: category})
      })
    }
    return categoryFilter
  }

  categoryFilters = (event) => {
    // outertext when clicking delete event.currentTarget.parentElement.outerText
    // event.currentTarget.className = 'delete icon'
    if (event.currentTarget.className === 'delete icon') {
      this.setState({category_name: this.state.category_name.filter(name => name !== event.currentTarget.parentElement.outerText)})
    } else {
      this.setState({category_name: this.state.category_name.concat([event.currentTarget.innerText]) })
    }
  }

  filterTransactions = (event) => {
    transactions = []
    let state = this.state
    state.category_name.forEach(category => {
      this.props.user.transactions.forEach(transaction => {
        if (transaction.category_name === category) {
          transactions.push(transaction)
        }
      })
    })
    this.props.filterTransactions(transactions)
  }


  render(){
    let data = this.filterData()
    console.log(this.state)
    return (
      <div>
        <Dropdown placeholder='Category' onChange={this.categoryFilters} value={this.state.category_name} fluid multiple search selection options={data} />
        <Button onClick={this.filterTransactions}> Filter</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    categories: state.auth.categories
  }
}
export default connect(mapStateToProps, actions)(Filter);
