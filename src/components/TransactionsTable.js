import React from 'react'
import {Container, Table, Pagination, Header, Grid, Button} from 'semantic-ui-react'
import Transaction from './Transaction'
import { connect } from 'react-redux'
import * as actions from '../actions'
import AddTransaction from './AddTransaction'

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
      showEllipsis: true,
      showFirstAndLastNav: false,
      showPreviousAndNextNav: false
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
      if (this.props.user.transactions) {
        item = this.props.user.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
        accountName = 'All accounts'
        accountBalance = numberWithCommas(parseFloat(Math.round(this.props.user.account_balance * 100)/100).toFixed(2))
        transactionsLength = this.props.user.transactions.length
        return item.map((transaction,index) => {
          return (
            <Transaction key={index} transaction={transaction}/>
          )
        })
      } else {
        <div/>
      }
    }
  }
  render(){
    console.log(this.props)
    const {currentPage, transactionsPerPage, boundaryRange,siblingRange,showEllipsis, showFirstAndLastNav,showPreviousAndNextNav} = this.state
    let data = this.transactionData()
    let pageNumbers = []
    for (let i = 1; i <=Math.ceil(transactionsLength/transactionsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <Container>
        <AddTransaction/>
        <Grid columns={2}>
          <Grid.Column>
            <Header as='h1'>{accountName}: {accountBalance}</Header>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={()=>this.props.modal(!this.props.modalBoolean)} floated='right' color='olive'>Add Transaction</Button>
          </Grid.Column>
        </Grid>
        <Table color='olive' compact='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Date </Table.HeaderCell>
              <Table.HeaderCell> Merchant </Table.HeaderCell>
              <Table.HeaderCell> Category </Table.HeaderCell>
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

const mapStateToProps = state => {
  return {
    modalBoolean: state.modal.modalOpen
  }
}
export default connect(mapStateToProps, actions)(TransactionsTable)
