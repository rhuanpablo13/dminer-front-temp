import { messagesFetch } from '@/util/toast.js'

import { apiLogin } from './http'

export const fetchtAuth = async (item) => {
  const response = await apiLogin.post('/api/auth/login', item)
  
  if (response.data.hasOwnProperty('id')) return messagesFetch('login', 400, [], response.data.messages[0].message)

  return messagesFetch('login', response.status, response.data)
}
