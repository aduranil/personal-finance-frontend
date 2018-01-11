import React from 'react'
import {Table} from 'semantic-ui-react'

const Transaction = ({account}) => {
  return (
    <tr>
      <Table.Cell>
        {account.date}
      </Table.Cell>
      <Table.Cell>
        {account.description}
      </Table.Cell>
      <Table.Cell>
        {account.amount}
      </Table.Cell>
    </tr>
  )
}

export default Transaction;
