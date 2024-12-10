import React from 'react'
import { Table } from 'antd'
import { useCrypto } from '../hooks/crypto'

function AssetsTable() {
  const {assets} = useCrypto()

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Price, $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price, 
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.amount - b.amount,
    },
  ]
  
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount
  }))

  return (
    <Table
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
      pagination={false}
    />
  )
}

export default AssetsTable