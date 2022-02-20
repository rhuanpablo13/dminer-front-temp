import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/survey'

export const fetchAll = async (login) => {
  const response = await apiIntra(`${URL}/all/${login}`)
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

export const fetchQuizAnswer = async (id, option, login) => {
  const response = await apiIntra.post(`${URL}/answer/${id}/${login}/${option}`)
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchDelete = async (id) => {
  const response = await apiIntra.delete(`${URL}/${id}`)
  return messagesFetch('delete', response.status, response.data.data)
}