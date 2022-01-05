import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = 'full-calendar'

export const fetchEvents = async (login) => {
  const response = await apiIntra(`${URL}/all/${login}`)
  return response.status === 200 ? response.data.data : []
}

export const storeEvent = async (item) => {
  const response = await apiIntra.post(`${URL}`, item)
  return messagesFetch('registration', response.status, response.data.data)
}

export const mutateEvent = async (event, id) => {
  const response = await apiIntra.put(`${URL}`, event)
  return messagesFetch('update', response.status, response.data.data)
}

export const destroyEvent = async (id) => {
  const response = await apiIntra.delete(`${URL}/${id}`)
  return messagesFetch('delete', response.status, [])
}
