import useReminder from '@/composables/useReminder'
import useQuiz from '@/composables/useQuiz'
import useSearch from '@/composables/useSearch'
import useFeed from '@/composables/useSearch'

const initialState = [
  'noticeList',
  'notificationlist',
  'reminderList',
  'birthdayList',
  'quizList',
  'usersList',
  'feedList',
]

const { getSearch } = useSearch()
const { updateCount, setQuiz } = useQuiz()
const { updateReminder, setReminder } = useReminder()
const { setFeed, getFeeds } = useFeed()

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

          // localStorage.home = JSON.stringify(payload)
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
          this.dispatch('home/setQuis')
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )
    },
    setQuis({ commit}){
      return setQuiz(this.state.user.login).then(
        (payload) => {
          this.state.home.quizList = payload
          commit('answerSuccess', payload)
          localStorage.quizList = JSON.stringify(payload)
        },
        (error) => {
          console.log(error)
          commit('searchFailure')
          return Promise.reject(error)
        }
      )     
    },
    reminderCheck({ commit }, item) {
      return updateReminder(item).then(
        (payload) => {
          this.state.home.quizList = setReminder(this.state.user.login)
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
    },
    answerSuccess(state, payload) {
      state.quizList = payload
    }
  }
}
