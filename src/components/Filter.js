import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Dropdown } from 'semantic-ui-react'

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
    this.setState({category_name: this.state.category_name.concat(event.currentTarget.innerText) })
  }

  filterTransactions = () => {
    let transactions = this.state.user.transactions
    let state = this.state
    let filter

  }

  render(){
    console.log(this.props)
    console.log(this.state)
    let data = this.filterData()
    return (
      <Dropdown placeholder='Category' onChange={this.categoryFilters} fluid multiple search selection options={data} />
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
