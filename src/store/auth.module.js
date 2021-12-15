import useAuth from '@/composables/useAuth'
import { messagesFetch } from '@/util/toast.js'

const userLocalStorage = localStorage.user && JSON.parse(localStorage.user)

const initialState = userLocalStorage
  ? { status: { loggedIn: true } }
  : { status: { loggedIn: false } }

const { login, logout } = useAuth()

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
          // messagesFetch('login', 400, null)
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      logout()
      commit('logout')
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      this.dispatch('user/setUser', user)
    },
    loginFailure(state) {
      state.status.loggedIn = false
      this.commit('user/success', null)
    },
    logout(state) {
      state.status.loggedIn = false
      this.commit('user/success', null)
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    }
  }
}
