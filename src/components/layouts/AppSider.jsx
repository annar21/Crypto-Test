import React, {useContext} from 'react'
import { Card, Layout, Statistic, List, Typography, Spin, Tag } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { capitalize } from '../../utils'
import cryptoContext from '../../context/crypto-context'

const siderStyle = {
  padding: '1rem',
}

function AppSider() {
  const {assets} = useContext(cryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => {
        if(asset) {
          // console.log(asset)
          return (
            <Card
              key={asset.id}  
              style={{
              marginBottom: '1rem'
              }}
            >
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              valueStyle={{
                color: asset.grow ? '#3f8600' : '#cf1322',
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
              suffix="$"
            />
            <List
              size="small"
              dataSource={[
                {title: 'Total Profit', value: asset.totalProfit, withTag: true},
                {title: 'Asset Amount', value: asset.amount, isPlain: true},
                // {title: 'Difference', value: asset.gorwPercent},
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.gorwPercent}%</Tag>}
                    {item.isPlain && item.value}
                    {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>}
                  </span>
                </List.Item>
          )}
        />
      </Card>
          )
        }
      }
      )}
    </Layout.Sider>
  )
}

export default AppSider