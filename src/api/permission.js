import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/permission'

export const fetchAll = async (token) => {
  const response = await apiIntra.post(`${URL}/all`, {token})
  return response.status === 200 ? response.data.data : []
}

export const fetchCreate = async (item) => {
  const response = await apiIntra.post(`${URL}`, item)
  return messagesFetch('registration', response.status, response.data.data)
}

export const fetchUpdate = async (item) => {
  const response = await apiIntra.put(`${URL}`, item)
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchDropdownPermissions = async (token) => {
  const response = await apiIntra.post(`${URL}/dropdown`, {token})
  return response.status === 200 ? response.data.data : []
}