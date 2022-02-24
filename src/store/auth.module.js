import useAuth from '@/composables/useAuth'
import { messagesFetch } from '@/util/toast.js'
import { setupAxiosToken } from '@/api/http'
import { useRoute } from "vue-router";

const userLocalStorage = localStorage.user && JSON.parse(localStorage.user)

const initialState = userLocalStorage
  ? { status: { loggedIn: true } }
  : { status: { loggedIn: false } }

const { login, logout } = useAuth()
const route = useRoute()

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
      commit('logout')
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      const adminUser = user.adminUser === "USUÁRIO-INTRANET" ? 0 : 1
      setupAxiosToken(user.baererAuthentication, user.login, adminUser)
      this.dispatch('user/setUser', user)
    },
    loginFailure(state) {
      state.status.loggedIn = false
      this.commit('user/success', null)
    },
    logout(state) {
      state.status.loggedIn = false
      
      let userReminder = {}
      let reminderPassword = localStorage.reminderPassword
      if (reminderPassword) {
        userReminder = JSON.parse(localStorage.userReminder)
      }

      localStorage.clear()

      if (reminderPassword) {
        localStorage.reminderPassword = reminderPassword
        localStorage.userReminder = JSON.stringify(userReminder)
      }
      
      sessionStorage.removeItem('timeout');

      this.commit('user/success', null)
      route.push('/login')
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    }
  }
}
