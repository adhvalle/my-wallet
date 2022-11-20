import { get, post } from './client'

export const fetchWallet = () => get('/wallet')

export const fetchContacts = () => get('/contacts')

export const sendTransaction = payload => post('/wallet/send', payload)