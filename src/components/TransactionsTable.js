import React from 'react'
import {Container,Table, Loader} from 'semantic-ui-react'
import Transaction from './Transaction'

class TransactionsTable extends React.Component {

  transactionData = () => {
    if (this.props.account.length > 0) {
      let item = this.props.account[0]
      return item.transactions.map((transaction, index) => {
        return (
          <Transaction key={index} transaction={transaction}/>
        )
      })
    } else {
      <div/>
    }
  }
  render(){
    let data = this.transactionData()
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
        </Table>
      </Container>
    )
  }

}

export default TransactionsTable
