import React from 'react'
import {Table} from 'semantic-ui-react'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
        {numberWithCommas(parseFloat(Math.round(props.transaction.amount * 100)/100).toFixed(2))}
      </Table.Cell>
    </tr>
  )
}

export default Transaction;
