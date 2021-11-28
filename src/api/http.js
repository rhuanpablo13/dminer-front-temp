import axios from 'axios'

export const apiLogin = axios.create({
  baseURL: 'https://www.dminerweb.com.br:8553',
  timeout: 0,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const wbDiminerImage = axios.create({
  baseURL: 'https://www.dminerweb.com.br:8553',
  timeout: 0,
  headers: {
    responseType: 'stream'
  }
})

export const apiIntra = axios.create({
  baseURL: 'https://dminer-api.herokuapp.com/api/'
})
