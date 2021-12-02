import useQuiz from '@/composables/useQuiz'
import useSearch from '@/composables/useSearch'

const initialState = {
  noticeList: [],
  notificationlist: [],
  reminderList: [],
  birthdayList: [],
  quizList: [],
  usersList: [],
  feedList: []
}

const homeState = localStorage.home
  ? JSON.parse(localStorage.home)
  : initialState

const { getSearch } = useSearch()
const { updateCount, setQuiz } = useQuiz()


export const home = {
  namespaced: true,
  state: homeState,

  actions: {
    search({ commit }, keyword) {
      return getSearch(keyword).then(
        (payload) => {
          this.state.home = payload
          localStorage.home = JSON.stringify(payload)
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
    answer({ commit }, {id, item }) {
      return updateCount(id, item, this.state.user.login).then(
        (payload) => {

          this.state.home.quizList = setQuiz()
          // commit('searchSuccess', payload)
          return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )
    } 
  },
  mutations: {
    searchSuccess(state, payload) {
      state = payload
    },
    searchFailure(state) {
      state = null
    }
  }
}
