import { useContext } from "react"
import cryptoContext from "../context/crypto-context"

export function useCrypto() {
  return useContext(cryptoContext)
}