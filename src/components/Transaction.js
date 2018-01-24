import React from 'react'
import {Table,Modal,Button} from 'semantic-ui-react'
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
    this.props.deleteTransaction(this.props.transaction.id,  this.props.transaction.account_id, this.props.transaction.amount)
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
        <Modal.Header> Transaction# {this.props.transaction.id} </Modal.Header>
          <Modal.Content>
            DATE: {this.props.transaction.period_name}<br/>
              AMOUNT: {numberWithCommas(parseFloat(Math.round(this.props.transaction.amount* 100)/100).toFixed(2))}<br/>
              MERCHANT: {this.props.transaction.merchant_name}<br/>
              DESCRIPTION: {this.props.transaction.description}<br/>
              CATEGORY: {this.props.transaction.category_name}<br/>
              ACCOUNT: {this.props.transaction.account_name}<br/>
              DEBIT/CREDIT: {this.props.transaction.debit_or_credit}<br/>
            <Button
              color='red'
              onClick={this.submitTransaction}>Delete </Button>
          </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    filtered: state.auth.filtered
  }
}


export default connect(mapStateToProps, actions)(Transaction);
