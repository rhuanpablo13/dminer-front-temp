import useList from '@/composables/useList'

const initialState = [
  'notice',
  'notification',
  'reminder',
  'birthday',
  'survey',
  'user',
  'feed',
]

const initialHomeState = [
  'noticeList',
  'notificationList',
  'reminderList',
  'birthdayList',
  'surveyList',
  'userList',
  'feedList',
]

const { setList, getListItem, deleteItem, create, update, updateCount, getSearchItem } = useList()

const homeState = {}
initialHomeState.map(item => {
  const store = localStorage[item] ? JSON.parse(localStorage[item]) : []
  homeState[item] = store
})

export const home = {
  namespaced: true,
  state: homeState,

  actions: {
    search: async ({ commit, dispatch },  { keyword, login  }) => {
      dispatch('setLoading')
      initialState.map(async item => {
        const payload = await getSearchItem(item, keyword, login)
        localStorage[`${item}List`] = JSON.stringify(payload)
        commit('success', { typeList: `${item}List`, payload })
      })
      dispatch('setLoading')
    },
    searchItem: async ({ commit, dispatch },  { keyword, login, typeList  }) => {
      dispatch('setLoading')
      const response = await getSearchItem(typeList, keyword, login)
      localStorage[`${typeList}List`] = JSON.stringify(response)
      commit('success', { typeList , payload: response })
      dispatch('setLoading')
    },
    getList: async ({ commit, dispatch }, { typeList, hasLogin, login}) => {
      const url = hasLogin ? `${typeList}/${login}` : typeList
      return setList(url).then(
        (payload) => {
          commit('success', { typeList, payload: getListItem.value} )
          dispatch('setLoading')
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          dispatch('setLoading')
          return Promise.reject(error)
        }
      )

    },
    answer({ commit, dispatch }, {id, item, typeList, hasLogin }) {
      const login  = this.state.user.login
      dispatch('setLoading')
      return updateCount(id, item, login).then(
        (payload) => {
          dispatch('getList', {typeList, hasLogin, login})
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )
    },

    // reminderCheck({ commit }, item) {
    //   return updateReminder(item).then(
    //     (payload) => {
    //       this.state.home.quizList = setReminder(this.state.user.login)
    //       return Promise.resolve(payload)
    //     },
    //     (error) => {
    //       console.log(error)
    //       commit('searchFailure')
    //       return Promise.reject(error)
    //     }
    //   )
    // },

    deleteItemList: async ({ commit, dispatch }, {typeList, id, hasLogin, login}) => {
      dispatch('setLoading')
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await deleteItem(url, id)
      dispatch('getList', {typeList, hasLogin, login})
    },
    createItemList: async ({ commit, dispatch}, {typeList, value, hasLogin, login }) => {
      dispatch('setLoading')
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await create(url, value)
      dispatch('getList', {typeList, hasLogin, login})
    },
    updateItemList: async ({ commit, dispatch }, {typeList, value, hasLogin,  login}) => {
      dispatch('setLoading')
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await update(url, value)
      dispatch('getList', {typeList, hasLogin, login})
    },
    setLoading({ commit }) {
      commit('loading')
    },
    setError({ commit }) {
      commit('error')
    },
    setSuccess({ commit }) {
      commit('success')
    }
  },
  mutations: {
    searchSuccess(state, payload) {
      state = payload
    },
    success(state, {typeList, payload}) {
      localStorage[`${typeList}List`] = JSON.stringify(payload)
      state[`${typeList}List`] = payload
    },
    searchFailure(state) {
      state = null
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
  }
}
