import React from 'react'
import {Table,Modal,Button, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class Transaction extends React.Component {
  state = {
    booleanTransaction: false
  }

  openModal = () => {
    this.setState({booleanTransaction: !this.state.booleanTransaction})
  }
  submitTransaction = () => {
    this.props.deleteTransaction(this.props.transaction.id, this.props.history, this.props.transaction.account_id)
    this.setState({booleanTransaction: !this.state.booleanTransaction})
  }
  render(){
    return (
      <Modal
        trigger={
          <tr onClick={this.openModal}>
            <Table.Cell>
              {this.props.transaction.account_name}
            </Table.Cell>
            <Table.Cell>
              {this.props.transaction.period_name}
            </Table.Cell>
            <Table.Cell>
              {this.props.transaction.merchant_name}
            </Table.Cell>
            <Table.Cell>
              {this.props.transaction.category_name}
            </Table.Cell>
            <Table.Cell>
              {numberWithCommas(parseFloat(Math.round(this.props.transaction.amount * 100)/100).toFixed(2))}
            </Table.Cell>
          </tr>
        }
        size='tiny'
        id={this.props.transaction.id}
        open={this.state.booleanTransaction}
        onClose={this.openModal}
      >
        <Modal.Header content='Transaction Details' />
          <Modal.Content>
            <Grid columns={2}>
              <Grid.Column width={5}>
                <b>Date:<br/>
                Amount:<br/>
                Merchant:<br/>
                Detailed Description:<br/>
                Category:<br/>
                Account:<br/>
                Debit or Credit:</b><br/>
              </Grid.Column>
              <Grid.Column width={11}>
                {this.props.transaction.period_name}<br/>
                {numberWithCommas(parseFloat(Math.round(this.props.transaction.amount* 100)/100).toFixed(2))}<br/>
                {this.props.transaction.merchant_name}<br/>
                {this.props.transaction.description}<br/>
                {this.props.transaction.category_name}<br/>
                {this.props.transaction.account_name}<br/>
                {this.props.transaction.debit_or_credit}<br/>
              </Grid.Column>
            </Grid>
            <Button
              color='red'
              onClick={this.submitTransaction}>Delete </Button>
          </Modal.Content>
      </Modal>
    )
  }
}

export default connect(null, actions)(Transaction);
