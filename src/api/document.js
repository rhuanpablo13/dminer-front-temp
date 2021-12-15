import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/document'

export const fetchAll = async () => {
  const response = await apiIntra(`${URL}/all`)
  return response.status === 200 ? response.data.data : []
}

export const fetchCreate = async (item) => {
  const response = await apiIntra.post(`${URL}`, item)
  debugger
  return messagesFetch('registration', response.status, response.data.data)
}

export const fetchUpdate = async (item) => {
  const response = await apiIntra.put(`${URL}`, item)
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchDelete = async (id) => {
  const response = await apiIntra.delete(`${URL}/${id}`)
  return messagesFetch('delete', response.status, [])
}

export const fetcSearch = async (keyword) => {
  const response = await apiIntra(`${URL}/search/${keyword}`)
  return response.status === 200 ? response.data.data : []
}
