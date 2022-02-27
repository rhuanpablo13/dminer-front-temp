import { messagesFetch } from '@/util/toast'
import useList from '@/composables/useList'

const initialState = {
  item: {},
  isLoading: false,
  noRegistry: true
}

const { getListItem, setList, deleteItem, search, create, update, getId } = useList()

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
        commit('successNoRegistry', true)
      })
    },
    deleteItemList: async ({ commit, dispatch }, {typeList, id}) => {
      await deleteItem(typeList, id)
      dispatch('getList', typeList)
    },
    createItemList: async ({ commit, dispatch, state}, {typeList, value}) => {
      dispatch('setLoading')
      await create(typeList, value)
      // if (getListItem.value.length) {
      //   commit('success', { payload: getListItem.value, typeList})
      // }
        state[typeList].unshift(value)
        dispatch('setLoading')
        commit('success', { typeList, payload: state[typeList] })
    },
    updateItemList: async ({ commit, dispatch, state }, {typeList, value}) => {
      dispatch('setLoading')
      await update(typeList, value)
      // if (getListItem.value.length) {
      //   commit('success', { payload: getListItem.value, typeList})
      // }
        // state.list.unshift(value)
        dispatch('setLoading')
        commit('success', { typeList, payload: state[typeList] })
    },
    setLoading({ commit }) {
      commit('loading')
    },
    setError({ commit }) {
      commit('error')
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
    error(state) {
      state.isError = true
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
