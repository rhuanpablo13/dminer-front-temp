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

const { create, update, crateComment, getPostsAll, favorite } = useFeed()
const { getPost, setPost, search, setReact } = usePost()

export const post = {
  namespaced: true,
  state: initialState,

  actions: {
    createPost({ commit, dispatch }, value) {
      this.dispatch('form/setLoading')
      return create(value).then(
        (payload) => {
          this.state.post.posts.unshift(payload)
          commit('successPosts', this.state.post.posts)
          this.dispatch('form/setLoading')
          this.dispatch('list/setNoRegistry', !this.state.post.posts.length)
          dispatch('form/setSuccess')
        },
        (error) => {
          console.log(error)
          this.dispatch('form/setLoading')
          dispatch('form/setError')
          commit('error')
          return Promise.reject(error)
        }
      )
    },
    updatePost({ commit, dispatch }, value) {
      this.dispatch('form/setLoading')
      return update(value).then(
        (payload) => {
          this.state.post.posts.unshift(payload)
          commit('successPosts', this.state.post.posts)
          this.dispatch('form/setLoading')
          this.dispatch('list/setNoRegistry', !this.state.post.posts.length)

          dispatch('form/setSuccess')
        },
        (error) => {
          console.log(error)
          this.dispatch('form/setLoading')
          dispatch('form/setError')
          commit('error')
          return Promise.reject(error)
        }
      )
    },
    // getPostViewAll({ commit }) {
    //   this.dispatch('list/setNoRegistry', true)
    //   this.dispatch('list/setLoading')

    //   return setAllPost().then(
    //     (payload) => {
    //       commit('successPosts', getPostsAll.value)
    //       this.dispatch('list/setLoading')
    //       this.dispatch('list/setNoRegistry', !getPostsAll.value.length)

    //     },
    //     (error) => {
    //       console.log(error)
    //       commit('error')
    //       return Promise.reject(error)
    //     }
    //   )
    // },
    getPostView({ commit }, idParam) {
      this.dispatch('list/setNoRegistry', true)
      this.dispatch('list/setLoading')

      return setPost(idParam).then(
        (payload) => {
          commit('successPost', getPost.value)
          this.dispatch('list/setNoRegistry', !Object.keys(getPost.value).length)
          this.dispatch('list/setLoading')
        },
        (error) => {
          console.log(error)
          commit('error')
          this.dispatch('list/setLoading')
          return Promise.reject(error)
        }
      )
    },
    goSearchView({ commit }, value) {
      this.dispatch('list/setLoading')
      this.dispatch('list/setNoRegistry', true)

      return search(value).then(
        (payload) => {
          commit('successPost', getPost.value)
          this.dispatch('form/setSuccess')
          this.dispatch('list/setLoading')
          this.dispatch('list/setNoRegistry', !getPostsAll.value.length)
        },
        (error) => {
          console.log(error)
          this.this.dispatch('form/setLoading')
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
