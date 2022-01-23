import useFeed from '@/composables/useFeed.js'
import usePost from '@/composables/usePost.js'
import { messagesFetch } from '@/util/toast'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  post: {},
  posts: []
}

const { crateComment, setAllPost, getPostsAll, searchAll, getFavorites, favorite } = useFeed()
const { getPost, setPost, search, setReact } = usePost()

export const post = {
  namespaced: true,
  state: initialState,

  actions: {
    getPostViewAll({ commit }) {
      return setAllPost().then(
        (payload) => {
          commit('successPosts', getPostsAll.value)
          // return Promise.resolve(payload)
        },
        (error) => {
          console.log(error)
          commit('error')
          return Promise.reject(error)
        }
      )
    },
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
    goSearchViewAll({ commit }, value) {
      this.dispatch('form/setLoading')
      return searchAll(value).then(
        (payload) => {
          commit('successPosts', getPostsAll.value)
          this.dispatch('form/setLoading')
          this.dispatch('form/setSuccess')

        },
        (error) => {
          console.log(error)
          this.dispatch('form/setLoading')
          this.dispatch('form/setError')

          commit('error')
          return Promise.reject(error)
        }
      )
    },
    goSearchView({ commit }, value) {
      this.dispatch('form/setLoading')
      return search(value).then(
        (payload) => {
          commit('successPost', getPost.value)
          this.dispatch('form/setLoading')
          this.dispatch('form/setSuccess')

        },
        (error) => {
          console.log(error)
          this.dispatch('form/setLoading')
          this.dispatch('form/setError')

          commit('error')
          return Promise.reject(error)
        }
      )
    },
    setLike({ commit }, value) {
      return setReact(value).then(
        (payload) => {
          this.dispatch('post/getPostViewAll')
          this.dispatch('post/getPostView', value.id)        
        },
        (error) => {
          console.log(error)

          commit('error')
          return Promise.reject(error)
        }
      )
    },    
    getFavorite({ commit }) {
      return getFavorites(this.state.user.login).then(
        (payload) => {
          commit('successPosts', getPostsAll.value)
        },
        (error) => {
          console.log(error)

          commit('error')
          return Promise.reject(error)
        }
      )
    },    
    setFavorite({ commit }, id) {
      return favorite({idPost: id, login: this.state.user.login }).then(
        (payload) => {
          // commit('successPosts', getPostsAll.value)
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
          this.dispatch('post/getPostViewAll')
          this.dispatch('post/getPostView', value.idPost)
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
    successPosts(state, payload) {
      state.posts = payload
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
