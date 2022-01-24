import { messagesFetch } from '@/util/toast.js'

import { apiIntra, wbDiminerImage } from './http'

const URL = '/user'

export const fetchAvatar = async (id) => {
  const response = await fetch(
    `https://www.dminerweb.com.br:8553/api/auth/avatar/?login_user=${id}`
  )

  return response.status === 200 ? response.blob() : []
}

export const fetchBanner = async (login) => {
  const response = await apiIntra(`${URL}/${login}`)
  return response.status === 200 ? response.data.data.banner : []
}

export const fetchUpdateBanner = async (login, banner) => {
  const response = await apiIntra.put(`${URL}`, { banner, login })
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchUpdatePermission = async (login, permission) => {
  const response = await apiIntra.put(`${URL}/permission`, { permission, login })
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchAllUser = async () => {
  const response = await apiIntra.post(`${URL}/all`)
  return response.status === 200 ? response.data.data : []
}

export const fetchUser = async (id) => {
  const response = await apiIntra(`${URL}/${id}`)
  return response.status === 200 ? response.data.data : []
}

export const fetchUsersBirthday = async () => {
  const response = await apiIntra(`${URL}/birthdays`)

  return response.status === 200 ? response.data.data : []
}

export const fetchUpdate = async (user) => {
  const response = await apiIntra.put(`${URL}`, user)
  return messagesFetch('update', response.status, response.data.data)
}

export const fetchCreateUser = async (user) => {
  const response = await apiIntra.post(`${URL}`, user)
  return messagesFetch('registration', response.status, response.data.data)
}


export const fetchDropdownUser = async () => {
  const response = await apiIntra.post(`${URL}/dropdown`)
  return response.status === 200 ? response.data.data : []
}

export const fetcSearch = async (keyword) => {
  const response = await apiIntra(`${URL}/search/${keyword}`)
  return response.status === 200 ? response.data.data : []
}
