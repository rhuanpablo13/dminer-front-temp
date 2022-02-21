const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  isLoadingFavorite: false,
}

export const form = {
  namespaced: true,
  state: initialState,

  actions: {
    setLoading({ commit }) {
      commit('loading')
    },
    setLoadingFavorite({ commit }) {
      commit('loadingFavorite')
    },
    setError({ commit }) {
      commit('error')
    },
    setSuccess({ commit }) {
      commit('success')
    }
  },
  mutations: {
    loading(state) {
      state.isLoading = !state.isLoading
    },
    loadingFavorite(state) {
      state.isLoadingFavorite = !state.isLoadingFavorite
    },
    error(state) {
      state.isError = true
      setTimeout(() => {
        state.isError = false
      }, 3000)
    },
    success(state) {
      state.isSuccess = true
      setTimeout(() => {
        state.isSuccess = false
      }, 3000)
    }
  }
}
