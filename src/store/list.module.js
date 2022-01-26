import { messagesFetch } from '@/util/toast'
import useDocument from '@/composables/useDocument'


const initialState = {
  list: [],
}

const { getDocuments, setDocument, deleteItem, search } = useDocument()


export const list = {
  namespaced: true,
  state: initialState,

  actions: {
    getList: async ({ commit }, typeList) => {
      switch (typeList) { 
        case 'documents': 
          await setDocument()
          if (getDocuments.value.length) {
            commit('success', getDocuments.value )
          }
          break
      }
    },
    searchItemList: async ({ commit }, {typeList, value}) => {
      switch (typeList) { 
        case 'documents': 
          await search(value)
          if (getDocuments.value.length) {
            commit('success', getDocuments.value )
          }
          break
      }
    },

    deleteItemList: async ({ commit, dispatch }, {typeList, id}) => {
      switch (typeList) { 
        case 'documents': 
          await deleteItem(id)
          break
        }
        dispatch('getList', typeList)
    },
  
  },
  mutations: {
    success(state, payload) {
      state.list = payload
    }
  }
}
