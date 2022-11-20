import { post } from './client'

export const login = () => post('/login', { username: 'vicky', password: 'secret' })
