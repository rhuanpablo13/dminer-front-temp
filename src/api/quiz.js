import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/survey'

export const fetchAll = async () => {
  const response = await apiIntra(`${URL}/all`)
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
