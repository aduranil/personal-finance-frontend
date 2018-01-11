import React from 'react'
import {Table} from 'semantic-ui-react'

const Transaction = props => {
  return (
    <tr>
      <Table.Cell>
        {props.transaction.date}
      </Table.Cell>
      <Table.Cell>
        {props.transaction.category_name}
      </Table.Cell>
      <Table.Cell>
        {props.transaction.amount}
      </Table.Cell>
    </tr>
  )
}

export default Transaction;
