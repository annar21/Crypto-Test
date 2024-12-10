import AppLoyout from './components/layouts/AppLoyout'
import { CryptoContextProvider } from './context/crypto-context'  

function App() {
  return (
    <CryptoContextProvider>
      <AppLoyout />
    </CryptoContextProvider>
  )
}

export default App
