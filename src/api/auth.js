import { post } from './client'

export const login = payload => post('/login', payload)
