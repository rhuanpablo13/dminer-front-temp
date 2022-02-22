import useSearch from '@/composables/useSearch'

import useList from '@/composables/useList'

const initialState = [
  'noticeList',
  'notificationList',
  'reminderList',
  'birthdayList',
  'surveyList',
  'usersList',
  'feedList',
]

const { getSearch } = useSearch()
const { setList, getListItem, deleteItem, create, update, updateCount } = useList()

const homeState = []
initialState.map(item => {
  const store = localStorage[item] ? JSON.parse(localStorage[item]) : []
  homeState[item] = store
})

export const home = {
  namespaced: true,
  state: homeState,

  actions: {
    search({ commit }, keyword) {
      return getSearch(keyword).then(
        (payload) => {
          this.state.home = payload

          try {
            initialState.map(item => {
              localStorage[item] = JSON.stringify(payload[item])
            })
          } catch (error) {
            
          }

          commit('searchSuccess', payload)
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )
    },
    getList: async ({ commit }, { typeList, hasLogin}) => {
      const url = hasLogin ? `${typeList}/${this.state.user.login}` : typeList

      return setList(url).then(
        (payload) => {
          commit('success', { typeList, payload: getListItem} )

          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )

    },
    answer({ commit }, {id, item }) {
      const login  = this.state.user.login
      return updateCount(id, item, login).then(
        (payload) => {
          this.dispatch('getList', {typeList, hasLogin: true, login})
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )
    },
    // setQuis({ commit}){
    //   return setQuiz(this.state.user.login).then(
    //     (payload) => {
    //       this.state.home.quizList = payload
    //       commit('answerSuccess', payload)
    //       localStorage.quizList = JSON.stringify(payload)
    //     },
    //     (error) => {
    //       console.log(error)
    //       commit('searchFailure')
    //       return Promise.reject(error)
    //     }
    //   )     
    // },
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
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await deleteItem(url, id)
      dispatch('getList', {typeList, hasLogin})
    },
    createItemList: async ({ commit, dispatch}, {typeList, value, hasLogin, login }) => {
      dispatch('form/setLoading')
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await create(url, value)
      dispatch('getList', {typeList, hasLogin})
    },
    updateItemList: async ({ commit, dispatch }, {typeList, value, hasLogin,  login}) => {
      dispatch('form/setLoading')
      const url = hasLogin ? `${typeList}/${login}` : typeList
      await update(url, value)
      dispatch('getList', {typeList, hasLogin})
    },

  },
  mutations: {
    searchSuccess(state, payload) {
      state = payload
    },
    success(state, {typeList, payload}) {
      state[`${typeList}List`] = payload
    },
    searchFailure(state) {
      state = null
    },
    answerSuccess(state, payload) {
      state.quizList = payload
    }
  }
}
