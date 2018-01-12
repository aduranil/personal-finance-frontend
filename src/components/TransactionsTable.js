import React from 'react'
import {Container, Table, Menu, Pagination, Header} from 'semantic-ui-react'
import Transaction from './Transaction'
let item
let transactionsLength
let accountName
let accountBalance

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
      siblingRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: false,
      showPreviousAndNextNav: false,
    }
  }

  handlePageChange = (event) => {
    this.setState({currentPage: Number(event.currentTarget.innerHTML)})
  }

  transactionData = () => {
    const {currentPage, transactionsPerPage} = this.state
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexOfFirstTransaction = indexOfLastTransaction-transactionsPerPage

    if (this.props.account.length > 0) {
      accountName = this.props.account[0].name
      accountBalance = numberWithCommas(parseFloat(Math.round(this.props.account[0].balance * 100)/100).toFixed(2))
      item = this.props.account[0].transactions.slice(indexOfFirstTransaction,indexOfLastTransaction)
      transactionsLength = this.props.account[0].transactions.length
      return item.map((transaction, index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    } else {
      item = this.props.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
      accountName = 'All accounts'
      accountBalance = numberWithCommas(parseFloat(Math.round(this.props.user.account_balance * 100)/100).toFixed(2))
      transactionsLength = this.props.transactions.length
      return item.map((transaction,index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    }
  }
  render(){
    const {currentPage, transactionsPerPage, boundaryRange,siblingRange,showEllipsis, showFirstAndLastNav,showPreviousAndNextNav} = this.state
    let data = this.transactionData()
    let pageNumbers = []
    for (let i = 1; i <=Math.ceil(transactionsLength/transactionsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <Container>
        <Header as='h1'>{accountName} : {accountBalance}</Header>
        <Table color='olive' compact='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Date </Table.HeaderCell>
              <Table.HeaderCell> Description </Table.HeaderCell>
              <Table.HeaderCell> Amount $</Table.HeaderCell>
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

export default TransactionsTable
