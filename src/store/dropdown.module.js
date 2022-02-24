
import useList from '@/composables/useList'

const initialState = [
  'permissions',
  'react',
  'category',
  'priority'
]

// const dropdownInit = localStorage.dropdown
//   ? JSON.parse(localStorage.dropdown)
//   : initialState

const dropdownInit = {}
initialState.map(item => {
  const store = localStorage[item] ? JSON.parse(localStorage[item]) : []
  dropdownInit[item] = store
})

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
          commit('dropdownSuccess', {typeList: 'category', payload: payload})
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
          commit('dropdownSuccess', {typeList: 'permissions', payload: payload})
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
          commit('dropdownSuccess', {typeList: 'react', payload: payload})
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('dropdownFailure')
          return Promise.reject(error)
        }
      )
    },
    getDropdownPriority({ commit }) {
      return getDropdown('priority').then(
        (payload) => {
          commit('dropdownSuccess', {typeList: 'priority', payload: payload})
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
    dropdownSuccess(state, {typeList, payload}) {
      state[typeList] = payload
    },
    dropdownUserSuccess(state, payload) {
      state.user = payload
    },
    dropdownFailure(state) {
      state = null
    }
  }
}
