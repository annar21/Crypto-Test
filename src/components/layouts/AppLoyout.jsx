import React, { useContext } from 'react'
import { Layout, Spin } from 'antd'
import AppHeader from './AppHeader'
import AppSider from './AppSider'
import AppContent from './AppContent'
import cryptoContext from '../../context/crypto-context'


function AppLoyout() {
  const {loading} = useContext(cryptoContext)

  if(loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout>
      <AppHeader /> 
      <Layout>
        <AppSider />
        <AppContent />        
      </Layout>
    </Layout>
  )
}

export default AppLoyout