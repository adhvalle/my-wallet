import { reactive } from 'vue'
import { fetchWallet } from '@/api/wallet'

const state = reactive({
  wallet: null
})

export const getWallet = () => state.wallet
export const setWallet = wallet => { state.wallet = wallet }

/**
 * Get or fetch a Wallet
 * @returns {Promise<Object>}
 */
export const retrieveWallet = async () => {
  if (!state.wallet) {
    const response = await fetchWallet()
    setWallet(response)
  }

  return getWallet()
}
