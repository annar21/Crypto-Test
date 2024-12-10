import React from 'react'
import { Flex, Typography } from 'antd'

function CoinInfo({coin, showSymbol}) {
  return (
      <Flex align='center'>
        <img src={coin.icon} alt={coin.name} style={ {width: 40, marginRight: 10} } />
        <Typography.Title style={ {marginBottom: 0} } level={2}>
          {showSymbol && `(${coin.symbol})`} {coin.name}
        </Typography.Title>
      </Flex>
  )
}

export default CoinInfo