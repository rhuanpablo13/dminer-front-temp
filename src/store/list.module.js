import { messagesFetch } from '@/util/toast'
import useList from '@/composables/useList'

const initialState = {
  list: [],
  item: {}
}

const { getListItem, setList, deleteItem, search, create, update, getId } = useList()

export const list = {
  namespaced: true,
  state: initialState,

  actions: {
    getList: async ({ commit }, typeList) => {
      await setList(typeList)
      commit('success', getListItem.value )
    },
    getItem: async ({ commit }, {typeList, id}) => {
      await getId(typeList, id)
      commit('ItemSuccess', getListItem.value)
    },
    searchItemList: async ({ commit, dispatch }, {typeList, value}) => {
      dispatch('form/setLoading')
      await search(typeList, value)
      if (getListItem.value.length) {
        commit('success', getListItem.value )
      }
    },
    deleteItemList: async ({ commit, dispatch }, {typeList, id}) => {
      await deleteItem(typeList, id)
      dispatch('getList', typeList)
    },
    createItemList: async ({ commit, dispatch, state}, {typeList, value}) => {
      dispatch('form/setLoading')
      await create(typeList, value)
      // if (getListItem.value.length) {
      //   commit('success', getListItem.value)
      // }
      if (state.list.length) {
        state.list.unshift(value)
        dispatch('form/setLoading')
        commit('success', state.list)
      }
    },
    updateItemList: async ({ commit, dispatch, state }, {typeList, value}) => {
      dispatch('form/setLoading')
      await update(typeList, value)
      // if (getListItem.value.length) {
      //   commit('success', getListItem.value)
      // }
      if (state.list.length) {
       state.list.unshift(value)
       dispatch('form/setLoading')
        commit('success', this.state.list)
      }
    },
  },
  mutations: {
    success(state, payload) {
      state.list = payload
      this.dispatch('form/setSuccess')
    },
    ItemSuccess(state, payload) {
      this.dispatch('form/setLoading')
      state.item = payload
      this.dispatch('form/setSuccess')
    },
  }
}
