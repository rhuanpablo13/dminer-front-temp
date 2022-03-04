import useAuth from '@/composables/useAuth'
import { messagesFetch } from '@/util/toast.js'
import { setupAxiosToken } from '@/api/http'
import { useRouter } from "vue-router";
import * as translation from '@/util/pt_BR.json'

const userLocalStorage = sessionStorage.user && JSON.parse(sessionStorage.user)

const initialState = userLocalStorage
  ? { status: { loggedIn: true } }
  : { status: { loggedIn: false } }

const { login, logoutUse } = useAuth()
const router = useRouter()

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, value) {
      return login(value).then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          console.log(error)
          commit('loginFailure')
          //messagesFetch('login', 400, null)
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      logoutUse()
      this.dispatch('user/setUserLogout', null)
      commit('logoutSuccess')
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      const adminUser = user.adminUser === translation.SYSTEM.ADMINISTRADOR ? 1 : 0
      setupAxiosToken(user.baererAuthentication, user.login, adminUser)
      this.dispatch('user/setUser', user)
    },
    loginFailure(state) {
      state.status.loggedIn = false
    },
    logoutSuccess(state) {

      // Object.keys(this.state).map(key => {
      //   this.state[key] = {}
      // })
      this.state.user = {}
      this.state.auth = {
        status: {
          loggedIn : false
        }
      }
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    }
  }
}
