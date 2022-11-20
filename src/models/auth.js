import { reactive } from 'vue'
import { setHeader, removeHeader } from '@/api/client'
import { setWallet } from '@/models/wallet'
import {
  set as setStoreItem, remove as removeStoreItem, get as getStoreItem
} from '@/helpers/storage'

const state = reactive({
  token: null
})

export const getToken = () => state.token || getStoreItem('token')
export const setToken = token => {
  state.token = token
  setHeader('Authorization', token)
  token ? setStoreItem('token', token) : removeStoreItem('token')
}

export const setLoginData = data => {
  const { accessToken, tokenType } = data
  setToken(`${tokenType} ${accessToken}`)
}

export const logout = () => {
  setToken(null)
  setWallet(null)
  removeHeader('Authorization')
}
