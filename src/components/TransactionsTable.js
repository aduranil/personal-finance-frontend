import React from 'react'
import {Container,Table, Menu} from 'semantic-ui-react'
import Transaction from './Transaction'
let item
let transactionsLength

class TransactionsTable extends React.Component {
  constructor(){
    super()
    this.state = {
      currentPage: 1,
      transactionsPerPage: 25,
      activeItem: 1
    }
  }

  handlePageChange = (event) => {
    this.setState({currentPage: Number(event.target.id), activeItem: Number(event.target.id)})
  }

  transactionData = () => {
    const {currentPage, transactionsPerPage} = this.state
    const indexOfLastTransaction = currentPage * transactionsPerPage
    const indexofFirstTransaction = indexOfLastTransaction-transactionsPerPage

    if (this.props.account.length > 0) {
      item = this.props.account[0].transactions.slice(indexofFirstTransaction,indexOfLastTransaction)
      transactionsLength = this.props.account[0].transactions.length
      return item.map((transaction, index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    } else {
      item = this.props.transactions.slice(indexofFirstTransaction, indexOfLastTransaction)
      transactionsLength = this.props.transactions.length
      return item.map((transaction,index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    }
  }
  render(){
    const {activeItem, transactionsPerPage} = this.state
    let data = this.transactionData()
    let pageNumbers = []
    for (let i = 1; i <=Math.ceil(transactionsLength/transactionsPerPage); i++) {
      pageNumbers.push(i)
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Menu.Item
        id={number}
        key={number}
        active={activeItem === number}
        onClick={this.handlePageChange}
        >
          {number}
        </Menu.Item>
      )
    })

    return (
      <Container>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell> Date </Table.HeaderCell>
              <Table.HeaderCell> Description </Table.HeaderCell>
              <Table.HeaderCell> Amount </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu floated='right' pagination>
                  {renderPageNumbers}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    )
  }

}

export default TransactionsTable
