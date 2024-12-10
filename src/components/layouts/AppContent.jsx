import React from 'react'
import {Layout, Typography} from 'antd'
import { useCrypto } from '../../hooks/crypto'
import PortfolioChart from '../PortfolioChart'
import AssetsTable from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem'
}

function AppContent() {
  const {crypto, assets} = useCrypto()
  console.log(crypto, assets)

  const cryptoMap = crypto.reduce((acc, c) => {acc[c.id] = c.price; return acc}, {})

  return (
  <Layout.Content style={contentStyle}>
    <Typography.Title level={3} style={ {textAlign: 'left',color: '#fff'} }>Portfolio: 
      {/* {assets.map((asset) => {
        const coin = crypto.find(c => c.id === asset.id)
        return asset.amount * coin.price
      }).reduce((acc, v) => (acc+=v), 0).toFixed(2)}$ */}
      {assets
        .map((asset) => asset.amount * cryptoMap[asset.id])
        .reduce((acc, v) => acc += v, 0)
        .toFixed(2)}$
    </Typography.Title>
    <PortfolioChart />
    <AssetsTable />
  </Layout.Content>  
  )
}

export default AppContent