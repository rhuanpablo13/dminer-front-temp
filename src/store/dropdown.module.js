
import useUser from '@/composables/useUser'

const initialState = {
  user: [],
}

const dropdownInit = localStorage.dropdown
  ? JSON.parse(localStorage.dropdown)
  : initialState

const { setDropdownUser } = useUser()

export const dropdown = {
  namespaced: true,
  state: dropdownInit,

  actions: {
    getDropdownUser({ commit }) {
      return setDropdownUser().then(
        (payload) => {
          this.state.dropdown.user = payload
          commit('dropdownSuccess', payload)
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('dropdownFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    dropdownSuccess(state, payload) {
      localStorage.dropdown = JSON.stringify(payload)
      state = payload
    },
    dropdownFailure(state) {
      state = null
    }
  }
}
