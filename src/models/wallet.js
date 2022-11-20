import { reactive } from 'vue'
import { fetchWallet, fetchContacts } from '@/api/wallet'

const state = reactive({
  wallet: null,
  contacts: null
})

export const getWallet = () => state.wallet
export const setWallet = wallet => { state.wallet = wallet }

/**
 * Get or fetch a Wallet
 * @returns {Promise<Object>}
 */
export const retrieveWallet = async (force = false) => {
  if (force || !state.wallet) {
    const response = await fetchWallet()
    setWallet(response)
  }

  return getWallet()
}

export const getContacts = () => state.contacts
export const setContacts = contacts => { state.contacts = contacts }

/**
 * Get or fetch a Wallet
 * @returns {Promise<Object>}
 */
export const retrieveContacts = async () => {
  if (!state.contacts) {
    const response = await fetchContacts()
    setContacts(response)
  }

  return getContacts()
}
