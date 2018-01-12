import React from 'react'
import {Table} from 'semantic-ui-react'

const Transaction = props => {
  return (
    <tr>
      <Table.Cell>
        {props.transaction.period_name}
      </Table.Cell>
      <Table.Cell>
        {props.transaction.merchant_name}
      </Table.Cell>
      <Table.Cell>
        {props.transaction.amount}
      </Table.Cell>
    </tr>
  )
}

export default Transaction;
