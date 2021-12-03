
import useUser from '@/composables/useUser'
import usePermission from '@/composables/usePermission'

const initialState = {
  user: [],
  permissions: [],
}

const dropdownInit = localStorage.dropdown
  ? JSON.parse(localStorage.dropdown)
  : initialState

const { setDropdownUser } = useUser()
const { getPermission } = usePermission()

export const dropdown = {
  namespaced: true,
  state: dropdownInit,

  actions: {
    getDropdownUser({ commit }) {
      return setDropdownUser().then(
        (payload) => {
          this.state.dropdown.user = payload
          commit('dropdownSuccess', this.state.dropdown)
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('dropdownFailure')
          return Promise.reject(error)
        }
      )
    },
    getDropdownPermission({ commit }) {
      this.state.dropdown.permissions = getPermission
      commit('dropdownSuccess', this.state.dropdown)

      // return setDropdownUser().then(
      //   (payload) => {
      //     return Promise.resolve(payload)
      //   },
      //   (error) => {
      //     console.log(error)
      //     commit('dropdownFailure')
      //     return Promise.reject(error)
      //   }
      // )
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
