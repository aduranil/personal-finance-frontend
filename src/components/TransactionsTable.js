import React from 'react'
import {Container, Table, Pagination, Header, Grid} from 'semantic-ui-react'
import Transaction from './Transaction'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Filter from './Filter'
let item
let transactionsLength

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class TransactionsTable extends React.Component {
  constructor(){
    super()
    this.state = {
      currentPage: 1,
      transactionsPerPage: 25,
      boundaryRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: false,
      showPreviousAndNextNav: false,
      ascending : true
    }
  }

  handlePageChange = (event) => {
    this.setState({currentPage: Number(event.currentTarget.innerHTML)})
  }

  sortTransactions = (event) => {
    event.preventDefault()
    let value = event.target.id
    let sortedTransactions
    this.setState({ascending: !this.state.ascending})
    if (this.props.account && this.props.account.id) {
      sortedTransactions = this.props.account.transactions.slice()
    } else {
      sortedTransactions = this.props.user.transactions.slice()
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
    if (this.props.account && this.props.account.id) {
      this.props.updateAccount(sortedTransactions)
    } else {
      this.props.sortTransactions(sortedTransactions)
    }
  }

  transactionData = () => {
    const {currentPage, transactionsPerPage} = this.state
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction-transactionsPerPage
    let renderedTransactions = []
    if (this.props.account.transactions) {
      if (this.props.filtered) {
        renderedTransactions = this.props.filtered
      } else {
        renderedTransactions = this.props.account.transactions
      }
      item = renderedTransactions.slice(indexOfFirstTransaction,indexOfLastTransaction)
      transactionsLength = renderedTransactions.length
      return item.map((transaction, index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    }
  }
  render(){
    console.log(this.props)
    const {currentPage, transactionsPerPage, boundaryRange,showEllipsis, showFirstAndLastNav,showPreviousAndNextNav} = this.state
    let data = this.transactionData()
    let pageNumbers = []
    for (let i = 1; i <=Math.ceil(transactionsLength/transactionsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as='h1'>{this.props.account.name}: {numberWithCommas(parseFloat(Math.round(this.props.account.balance * 100)/100).toFixed(2))}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Filter/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table color='olive' compact='very' selectable sortable stackable>
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
            {data}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Pagination
                  activePage={currentPage}
                  boundaryRange={boundaryRange}
                  onPageChange={this.handlePageChange}
                  size='mini'
                  totalPages={Math.ceil(transactionsLength/transactionsPerPage)}
                  ellipsisItem={showEllipsis ? undefined : null}
                  firstItem={showFirstAndLastNav ? undefined : null}
                  lastItem={showFirstAndLastNav ? undefined : null}
                  prevItem={showPreviousAndNextNav ? undefined : null}
                  nextItem={showPreviousAndNextNav ? undefined : null}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    account: state.auth.account,
    filtered: state.auth.filtered
  }
}
export default connect(mapStateToProps, actions)(TransactionsTable)
