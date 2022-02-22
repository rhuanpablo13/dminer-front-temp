import { messagesFetch } from '@/util/toast.js'
import { apiIntra } from './http'

const URL = '/survey'

export const fetchQuizAnswer = async (id, option, login) => {
  const response = await apiIntra.post(`${URL}/answer/${id}/${login}/${option}`)
  return messagesFetch('update', response.status, response.data.data)
}
