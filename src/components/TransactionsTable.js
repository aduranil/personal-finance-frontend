import React from 'react'
import {Container,Table} from 'semantic-ui-react'
import Transaction from './Transaction'

class TransactionsTable extends React.Component {

  transactionData = () => {
    let item = this.props.active_account
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
