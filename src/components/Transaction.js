import React from 'react'
import {Table,Modal,Button, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const Transaction = props => {
  console.log(props)
  return (
    <Modal
      trigger={
        <tr
        >
          <Table.Cell>
            {props.transaction.period_name}
          </Table.Cell>
          <Table.Cell>
            {props.transaction.merchant_name}
          </Table.Cell>
          <Table.Cell>
            {props.transaction.category_name}
          </Table.Cell>
          <Table.Cell>
            {numberWithCommas(parseFloat(Math.round(props.transaction.amount * 100)/100).toFixed(2))}
          </Table.Cell>
        </tr>
      }
        size='tiny'
        id={props.transaction.id}
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
            {props.transaction.period_name}<br/>
            {numberWithCommas(parseFloat(Math.round(props.transaction.amount* 100)/100).toFixed(2))}<br/>
            {props.transaction.merchant_name}<br/>
            {props.transaction.description}<br/>
            {props.transaction.category_name}<br/>
            {props.transaction.account_name}<br/>
            {props.transaction.debit_or_credit}<br/>
          </Grid.Column>
        </Grid>
        <Button color='red' onClick={()=>props.deleteTransaction(props.transaction.id)} inverted> Delete </Button>
      </Modal.Content>
    </Modal>
  )
}

export default connect(null, actions)(Transaction);
