import useFeed from '@/composables/useFeed.js'
import usePost from '@/composables/usePost.js'
import { messagesFetch } from '@/util/toast'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  post: {}
}

const { crateComment } = useFeed()
const { getPost, setPost, search } = usePost()


export const post = {
  namespaced: true,
  state: initialState,

  actions: {
    getPostView({ commit }, idParam) {
      return setPost(idParam).then(
        (payload) => {
          commit('successPost', getPost.value)
          // return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('error')
          return Promise.reject(error)
        }
      )
    },
    goSearch({ commit }, value) {
      return search(value).then(
        (payload) => {
          commit('successPost', getPost.value)
          // return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('error')
          return Promise.reject(error)
        }
      )
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
    setComment({ commit }, value) {
      return crateComment(value).then(
        (payload) => {
         // this.dispatch('post/getPostView', value.idPost)
        },
        (error) => {
          messagesFetch('comment', 400, [])
          console.log(error)
          commit('error')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loading(state) {
      state.isLoading = !state.isLoading
    },
    successPost(state, payload) {
      state.post = payload
    },
    error(state) {
      state.isError = true
      setTimeout(() => {
        state.isError = false
      }, 3000)
    },
    comeent(state, payload){
      state.comment = payload
    },
    success(state) {
      state.isSuccess = true
      setTimeout(() => {
        state.isSuccess = false
      }, 3000)
    }
  }
}
