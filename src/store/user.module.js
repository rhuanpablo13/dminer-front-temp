import useUser from '@/composables/useUser'

const initialState = {
  name: '',
  avatar: '',
  banner: '',
  login: '',
  permission: ''
}
const userLocalStorage = localStorage.user
  ? JSON.parse(localStorage.user)
  : initialState

const { getAvatar, getBanner, updateBanner } = useUser()

export const user = {
  namespaced: true,
  state: userLocalStorage,
  actions: {
    setUser({ commit, state }, user) {
      const user_ = {
        ...state,
        name: user.usuario,
        login: user.login,
        permission: user.type
      }
      this.dispatch('home/search', null)
      this.dispatch('user/avatar', user_)
    },
    avatar({ commit, state }, user) {
      getAvatar(user.login).then(
        (response) => {
          state.avatar = response
          this.dispatch('user/banner', user)

          return Promise.resolve(response)
        },
        (error) => {
          console.error(error)
          commit('failure')
          return Promise.reject(error)
        }
      )
    },
    banner({ commit, state }, user) {
      getBanner(user.login).then(
        (response) => {
          state.banner = response
          commit('success', user)


          return Promise.resolve(response)
        },
        (error) => {
          console.error(error)
          commit('failure')
          return Promise.reject(error)
        }
      )
    },

    updateBanner({ commit, state }, banner) {
      updateBanner(state.login, banner).then(
        (response) => {
          state.banner = response
          commit('success', state)

          return Promise.resolve(response)
        },
        (error) => {
          console.error(error)
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    success(state, user) {
      state = user
    },
    failure(state) {
      state.user = initialState
    }
  }
}
