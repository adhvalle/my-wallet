import axios from 'axios'
import toCamelcase from 'camelcase-keys'
import toSnakecase from 'snakecase-keys'
import { getRouter } from '@/router'
import { getToken } from '@/models/auth'

let client

export const getClient = () => {
  if (!client) _init()
  return client
}

export const removeHeader = key => {
  delete getClient().defaults.headers.common[key]
}

export const setHeader = (key, value) => {
  getClient().defaults.headers.common[key] = value
}

export const get = (url, query = {}, headers = {}) =>
  _request('GET', url, null, query, headers)

export const post = (url, payload = {}, headers = {}) =>
  _request('POST', url, payload, {}, headers)

const _init = () => {
  client = axios.create({ baseURL: import.meta.env.VITE_API_HOST })

  if (getToken()) client.defaults.headers.common.Authorization = getToken()

  client.interceptors.request.use(request => {
    if (request.data && request.data instanceof FormData === false) request.data = _snakecaseKeys(request.data)
    if (request.params) request.params = _snakecaseKeys(request.params)

    return request
  })

  client.interceptors.response.use(
    response => {
      if (response.data) response.data = toCamelcase(response.data, { deep: true })
      return response
    },
    error => {
      if (error?.response?.status === 401) getRouter().push({ name: 'login' })

      return Promise.reject(error)
    }
  )
}

const _snakecaseKeys = object =>
  typeof object === 'object' ? toSnakecase(object, { deep: true }) : object

const _request = async (method, url, data = {}, query = {}, headers = {}) => {
  let error = null
  const response = await getClient().request({
    method,
    url,
    data,
    params: query,
    headers
  }).catch(error => { console.warn(error) })

  return new Promise((resolve, reject) => response ? resolve(response.data) : reject(error))
}
