import { messagesFetch } from '@/util/toast'
import useList from '@/composables/useList'
import useFeed from '@/composables/useFeed'

const initialState = {
  item: {},
  isLoading: false,
  noRegistry: true
}

const { getListItem, setList, deleteItem, search, create, update, getId, getFavorites, searchAll } = useList()
const { favorite } = useFeed()

export const list = {
  namespaced: true,
  state: initialState,

  actions: {
    getList: ({ commit, dispatch}, typeList) => {
      dispatch('setLoading')
      commit('successNoRegistry', true)

      return setList(typeList).then(
        () => {
          commit('success', { payload: getListItem.value, typeList} )
          dispatch('setLoading')
          commit('successNoRegistry', !getListItem.value.length)
        },
        (error) => {
          dispatch('setLoading')
          commit('successNoRegistry', true)
        },
      )},
    getItem: ({ commit, dispatch}, {typeList, id}) => {
      dispatch('setLoading')
      commit('successNoRegistry', true)

      return getId(typeList, id).then(()=> {
        commit('ItemSuccess', getListItem.value)
        dispatch('setLoading')
        commit('successNoRegistry', !Object.keys(getListItem.value).length)
      },
      (error) => {
        dispatch('setLoading')
        commit('successNoRegistry', true)
      },
    )},
    searchItemList: ({ commit, dispatch }, {typeList, value}) => {
      dispatch('setLoading')
      commit('successNoRegistry', true)

      return search(typeList, value).then(() => {
        commit('success', { payload: getListItem.value, typeList} )
        dispatch('setLoading')
        commit('successNoRegistry', !getListItem.value.length)
      },
      (error) => {
        dispatch('setLoading')
        commit('error', error)

        commit('successNoRegistry', !getListItem.value.length)
      })
    },
    goSearchViewAll({ commit }, value) {
      dispatch('setLoading')
      commit('successNoRegistry', true)

      return searchAll(value).then(
        (payload) => {
          commit('success', { payload: getListItem.value, typeList} )
          dispatch('setLoading')
          commit('successNoRegistry', !getListItem.value.length)
        },
        (error) => {
          console.log(error)
          dispatch('setLoading')
          commit('error', error)

          return Promise.reject(error)
        }
      )
    },
    deleteItemList: ({ commit, dispatch }, {typeList, id}) => {
      return deleteItem(typeList, id).then(() => {
        dispatch('getList', typeList)
      },
      (error) => {
        dispatch('setLoading')
        commit('error', error)
        commit('successNoRegistry', !getListItem.value.length)
      })
    },
    createItemList: ({ commit, dispatch, state}, {typeList, value}) => {
      dispatch('setLoading')
      return create(typeList, value).then((payload) => {
        state[typeList].unshift(payload)
        dispatch('setLoading')
        commit('successNoRegistry', !state[typeList].length)
        commit('success', { typeList, payload: state[typeList] })
      },
      (error) => {
        dispatch('setLoading')
        commit('error', error)
      })
      // if (getListItem.value.length) {
      //   commit('success', { payload: getListItem.value, typeList})
      // }
    },
    updateItemList: async ({ commit, dispatch, state }, {typeList, value}) => {
      dispatch('setLoading')
      return update(typeList, value).then(() => {
        dispatch('setLoading')
        state[typeList].map((item, key) => {
          if (value.id === item.id) {
            state[typeList][key] = value
          }
        })

        commit('successNoRegistry', !state[typeList].length)
        commit('success', { typeList, payload: state[typeList] })
      }, 
      (error) => {
        dispatch('setLoading')
        commit('error', error)
      })
      // if (getListItem.value.length) {
      //   commit('success', { payload: getListItem.value, typeList})
      // }
        // state.list.unshift(value)
    },    
    setFavorite({ commit }, { value, typeList }) {
      const login = this.state.user.login
      return favorite({...value, login}).then(
        (payload) => {
          state[typeList].map(post => {
            if (post.id === value.idPost) {
              const index = post.favorites.indexOf(login)
              if (index === -1) {
                post.favorites.push(login)
              } else {
                post.favorites.splice(index, 1);
              }
            }
          })

          commit('successPost', state[typeList])
        },
        (error) => {
          console.log(error)

          commit('error')
          return Promise.reject(error)
        }
      )
    },
    getFavorite({ commit }) {
      this.dispatch('form/setLoadingFavorite')
      dispatch('setLoading')
      commit('successNoRegistry', true)

      return getFavorites(this.state.user.login).then(
        (payload) => {
          commit('successPosts', getListItem.value)
          this.dispatch('form/setLoadingFavorite')
          dispatch('setLoading')
          commit('successNoRegistry', !getListItem.value.length)

        },
        (error) => {
          console.log(error)
          this.dispatch('form/setLoadingFavorite')
          dispatch('setLoading')
          commit('successNoRegistry', true)

          commit('error')
          return Promise.reject(error)
        }
      )
    },   
    setLoading({ commit }) {
      commit('loading')
    },
    setError({ commit }, error) {
      commit('error', error)
    },
    setSuccess({ commit }) {
      commit('success')
    },
    setNoRegistry({ commit }, value) {
      commit('successNoRegistry', value)
    }
  },
  mutations: {
    success(state, { payload, typeList }) {
      state[typeList] = payload
    },
    ItemSuccess(state, payload) {
      state.item = payload
    },
    loading(state) {
      state.isLoading = !state.isLoading
    },
    error(state, error) {
      state.isError = true
      messagesFetch('list', 400, [],   error)
      setTimeout(() => {
        state.isError = false
      }, 3000)
    },
    successNoRegistry(state, payload) {
      state.noRegistry = payload
    },
    // success(state) {
    //   state.isSuccess = true
    //   setTimeout(() => {
    //     state.isSuccess = false
    //   }, 3000)
    // }
  }
}
