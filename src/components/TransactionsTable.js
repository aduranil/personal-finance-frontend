import React from 'react'
import {Container, Table, Pagination, Header, Grid, Divider} from 'semantic-ui-react'
import Transaction from './Transaction'
import { connect } from 'react-redux'
import * as actions from '../actions'
let item
let transactionsLength

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class TransactionsTable extends React.Component {
  constructor(){
    super()
    this.state = {
      transactionsPerPage: 25,
      boundaryRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: false,
      showPreviousAndNextNav: false,
      ascending : true
    }
  }

  handlePageChange = (event) => {
    this.props.activeItem(Number(event.currentTarget.innerHTML))
  }
  //
  // componentDidMount(){
  //   this.props.history.push('/')
  // }

  sortTransactions = (event) => {
    let value = event.target.id
    let sortedTransactions
    this.setState({ascending: !this.state.ascending})
    if (this.props.filtered) {
      sortedTransactions = this.props.filtered
    } else {
      sortedTransactions = this.props.user.transactions
    }
    if (this.state.ascending) {
      if (isNaN(sortedTransactions[0][value])) {
        sortedTransactions = sortedTransactions.sort((a,b) => {
          if (a[value].toLowerCase() < b[value].toLowerCase() ) {
            return -1
          } else if (a[value].toLowerCase() > b[value].toLowerCase() ) {
            return 1
          }
        })
      } else {
        sortedTransactions = sortedTransactions.sort((a,b) => {
          if (a[value] < b[value]) {
            return -1
          } else if (a[value] > b[value]) {
            return 1
          }
        })
      }
    } else {
      if (isNaN(sortedTransactions[0][value])) {
        sortedTransactions = sortedTransactions.sort((a,b) => {
          if (a[value].toLowerCase() > b[value].toLowerCase()) {
            return -1
          } else if (a[value].toLowerCase() < b[value].toLowerCase())  {
            return 1
          }
        })
      } else {
        sortedTransactions = sortedTransactions.sort((a,b) => {
          if (a[value] > b[value]) {
            return -1
          } else if (a[value] < b[value])  {
            return 1
          }
        })
      }
    }
    this.props.sortTransactions(sortedTransactions)
  }

  transactionData = () => {
    const {transactionsPerPage} = this.state
    const indexOfLastTransaction = this.props.page * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction-transactionsPerPage
    let renderedTransactions = []
    if (this.props.filtered) {
      renderedTransactions = this.props.filtered
    } else if (this.props.user.transactions){
      renderedTransactions = this.props.user.transactions
    }
    item = renderedTransactions.slice(indexOfFirstTransaction,indexOfLastTransaction)
    transactionsLength = renderedTransactions.length
    return item.map((transaction, index) => {
      return <Transaction key={index} transaction={transaction}/>
    })
  }

  render(){
    const {currentPage, transactionsPerPage, boundaryRange,showEllipsis, showFirstAndLastNav,showPreviousAndNextNav} = this.state
    let pageNumbers = []
    for (let i = 1; i <=Math.ceil(transactionsLength/transactionsPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <div>
        <Header as='h2'>Hi, {this.props.user.username}! Cash & Credit Accounts</Header>
        <Divider/>
        <Header as='h1'>{this.props.name}:  ${numberWithCommas(parseFloat(Math.round(this.props.balance * 100)/100))}</Header>
        <Divider/>
        <Table color='olive' compact='very' selectable sortable stackable striped  size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell id='account_name' onClick={this.sortTransactions}> Account </Table.HeaderCell>
              <Table.HeaderCell id='period_name' onClick={this.sortTransactions}> Date </Table.HeaderCell>
              <Table.HeaderCell id='merchant_name' onClick={this.sortTransactions}> Merchant </Table.HeaderCell>
              <Table.HeaderCell id='category_name' onClick={this.sortTransactions}> Category </Table.HeaderCell>
              <Table.HeaderCell id='amount' onClick={this.sortTransactions}> Amount $</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.transactionData()}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Pagination
                  activePage={this.props.page}
                  boundaryRange={boundaryRange}
                  onPageChange={this.handlePageChange}
                  size='mini'
                  totalPages={Math.ceil(transactionsLength/transactionsPerPage)}
                  firstItem={showFirstAndLastNav ? null : null}
                  lastItem={showFirstAndLastNav ? null : null}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table><br/><br/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    filtered: state.auth.filtered,
    name: state.auth.name,
    balance: state.auth.balance,
    page: state.auth.currentPage
  }
}
export default connect(mapStateToProps, actions)(TransactionsTable)
