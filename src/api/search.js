import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/search'

export const fetchSearch = async (keyword, login) => {
  const response = await apiIntra(`${URL}/${login}/${keyword}`)
  return response.status === 200 ? response.data.data : []
}
