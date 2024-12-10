import React, { useEffect, useState } from 'react'
import Layout from 'antd/es/layout/layout'
import { Select, Space, Button, Modal, Drawer } from 'antd'
import { useCrypto } from '../../hooks/crypto'
import CoinInfoModal from '../CoinInfoModal'
import AddAssetForm from '../AddAssetForm'

const headerStyle = {
  textAlign: 'center',
  height: 60,
  width: '100%',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

function AppHeader() {
  const { crypto } = useCrypto()
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [coin, setCoin] = useState(null)

  const reverseSelect = () => setSelect(prevSelect => !prevSelect)

  function handleSelect(value) {
    setModal(true)
    setCoin(crypto.find(c => c.id === value)) 
  }

  useEffect(() => {
    function keypress(event) {
      if(event.key === "/") {
        reverseSelect()
      }
    }
    document.addEventListener("keypress", keypress)

    return () => document.removeEventListener("keypress", keypress)
  }, [])

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onSelect={handleSelect}
        onClick={reverseSelect}
        style={{
          width: 250,
        }}
        value='press / to open'
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
     <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>

     <Modal open={modal} footer={null} onCancel={() => setModal(false)}>
        <CoinInfoModal coin={coin} />
      </Modal>
      
      <Drawer 
        title="Add Asset" 
        width={600} 
        onClose={() => setDrawer(false)} 
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}

export default AppHeader