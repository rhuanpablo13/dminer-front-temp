
import useUser from '@/composables/useUser'
import usePermission from '@/composables/usePermission'
import usePost from '@/composables/usePost'

const initialState = {
  user: [],
  permissions: [],
}

const dropdownInit = localStorage.dropdown
  ? JSON.parse(localStorage.dropdown)
  : initialState

const { setDropdownUser } = useUser()
const { setDropdownReact } = usePost()
const { setPermission } = usePermission()

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
      return setPermission().then(
        (payload) => {
          this.state.dropdown.permissions = payload
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
    getDropdownReact({ commit }) {
      return setDropdownReact().then(
        (payload) => {
          this.state.dropdown.react = payload
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
