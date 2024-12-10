import { createContext, useState, useEffect } from "react";
import { percentDifference } from "../utils";
import { fetchAssets, fetchCrypto } from "../api";

const cryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false, 
})

export function CryptoContextProvider({children}) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssets] = useState([])

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto))
  }

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find(c => c.id === asset.id)
      if(coin) {
        return {
          grow: asset.price < coin.price,
          gorwPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          name: coin.name,
          ...asset,
        }
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const {result} = await fetchCrypto()
      const assets = await fetchAssets()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  return (
    <cryptoContext.Provider value={ {loading, crypto, assets, addAsset} }>
      {children}
    </cryptoContext.Provider>
  )
}

export default cryptoContext