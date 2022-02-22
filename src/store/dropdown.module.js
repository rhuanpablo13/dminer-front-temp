
import useList from '@/composables/useList'

const initialState = {
  permissions: [],
  react: [],
  category: []
}

const dropdownInit = localStorage.dropdown
  ? JSON.parse(localStorage.dropdown)
  : initialState

const { getDropdown } = useList()

export const dropdown = {
  namespaced: true,
  state: dropdownInit,

  actions: {
    getDropdownUser({ commit }) {
      return getDropdown('user').then(
        (payload) => {
          commit('dropdownUserSuccess', payload)
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('dropdownFailure')
          return Promise.reject(error)
        }
      )
    },
    getDropdownCategory({ commit }) {
      return getDropdown('category').then(
        (payload) => {
          commit('dropdownCategorySuccess', payload)
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
      return getDropdown('permission').then(
        (payload) => {
          commit('dropdownSuccess', {type: 'permissions', payload: payload})
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
      return getDropdown('post/react').then(
        (payload) => {
          commit('dropdownSuccess', {type: 'react', payload: payload})
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
    dropdownSuccess(state, {type, payload}) {
      const dropdown = localStorage.dropdown  ? JSON.parse(localStorage.dropdown) : initialState
      state = {...dropdown, [type]: payload}

      localStorage.dropdown = JSON.stringify(state)
    },
    dropdownUserSuccess(state, payload) {
      state.user = payload
    },
    dropdownCategorySuccess(state, payload) {
      state.category = payload
    },
    dropdownFailure(state) {
      state = null
    }
  }
}
