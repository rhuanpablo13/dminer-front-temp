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
  baseURL: 'https://dminer-api.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setupAxiosToken = (token) => {
  apiIntra.interceptors.request.use(
    (config) => {
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
}
