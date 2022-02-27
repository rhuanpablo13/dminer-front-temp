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
  baseURL: 'http://localhost:8081/api/', //'https://dminer-api.herokuapp.com/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const setupAxiosToken = (token, login, adminUser) => {
  apiIntra.interceptors.request.use(
    (config) => {
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["x-access-token"] = token; // for Node.js Express back-end
        config.headers["x-access-login"] = login; 
        config.headers["x-access-adminUser"] = adminUser; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )
}
