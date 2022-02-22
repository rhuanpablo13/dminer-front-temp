import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

export const fetchAll = async (URL) => {
  const response = await apiIntra(`${URL}/all`)
  return response.status === 200 ? response.data.data : []
}

export const fetchId = async (id) => {
  const response = await apiIntra(`${URL}/find/${id}`)
  return response.status === 200 ? response.data.data : []
}

export const fetchCreate = async (URL, item) => {
  const response = await apiIntra.post(`${URL}`, item)
  return messagesFetch('registration', response.status, response.data.data)
}

export const fetchUpdate = async (URL, item) => {
  const response = await apiIntra.put(`${URL}`, item)
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchDelete = async (URL, id) => {
  const response = await apiIntra.delete(`${URL}/${id}`)
  return messagesFetch('delete', response.status, [])
}

export const fetchSearch = async (URL, keyword) => {
  const response = await apiIntra(`${URL}/search/${keyword}`)
  return response.status === 200 ? response.data.data : []
}

export const fetchSearchItem = async (URL, keyword) => {
  const response = await apiIntra(`${URL}/search/${keyword}`)
  return response.status === 200 ? response.data.data : []
}

export const fetchDropdown = async (URL) => {
  const response = await apiIntra.post(`${URL}/dropdown`)
  return response.status === 200 ? response.data.data : []
}

export const fetchFind = async (URL, keyword) => {
  const response = await apiIntra(`${URL}/find/${keyword}`)
  return response.status === 200 ? response.data.data : []
}
