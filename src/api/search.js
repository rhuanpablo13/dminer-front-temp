import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/search'

export const fetchSearch = async (keyword) => {
  const response = await apiIntra(`${URL}/${keyword}`)
  return response.status === 200 ? response.data.data : []
}
