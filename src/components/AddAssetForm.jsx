import React, { useRef, useState } from 'react'
import { useCrypto } from '../hooks/crypto'
import { Select, Space, Typography, Flex, Divider, Form, Input, Checkbox, Button, InputNumber, DatePicker, Result } from 'antd'
import CoinInfo from './CoinInfo'

function AddAssetForm({onClose}) {
  const [coin, setCoin] = useState(null)
  const { crypto, addAsset} = useCrypto()
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  const validateMessages = {
    required: '${label} is required',
    types: {
      number: '${label} is not valid number'
    },
    number: {
      range: '${label} must be between ${min} and ${max}'
    },
  } 

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date()
    }
    assetRef.current = newAsset
    setSubmitted(true)
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    })
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * amount).toFixed(2)
    })
  }

  if(submitted) {
    return (
      <Result
        status="success"
        title="New asset added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>
        ]}
      />
    )
  }

  if(!coin) {
    return (
      <Select
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        style={{
          width: "100%",
        }}
        placeholder="Select coin"
        optionLabelProp='label'
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon
        }))}
        optionRender={(option) => (
          <Space>
            <img width={20} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )} 
     />
    )
  }

  return (
    <Form
    form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={ {
        price: +coin.price.toFixed(2)
      } }
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} showSymbol={false} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0
          },
        ]}
      >
        <InputNumber placeholder='Enter coin amount' onChange={handleAmountChange} style={ {width: '100%'} } />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber onChange={handlePriceChange} style={ {width: '100%'} } />
      </Form.Item>

      <Form.Item
        label="Date & Time"
        name="date"
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber disabled style={ {width: '100%'} } />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddAssetForm