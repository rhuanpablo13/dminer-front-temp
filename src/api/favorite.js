import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = 'favorite'

export const fetchAllFavorites = async (login) => {
  const response = await apiIntra(`${URL}/all-by-user/${login}`)
  return response.status === 200 ? response.data.data : []
}

export const fetchCreateFavorite = async (item) => {
  const response = await apiIntra.post(`${URL}`, item)
  return messagesFetch('favorite', response.status, response.data.data)
}
