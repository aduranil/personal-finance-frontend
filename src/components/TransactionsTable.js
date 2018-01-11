import React from 'react'
import {Container, Button, Table, Menu,Divider, Dropdown} from 'semantic-ui-react'

class TransactionsTable extends React.Component {

  render(){
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
        </Table>
      </Container>
    )
  }

}

export default TransactionsTable
