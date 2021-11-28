const initialState = {
  collapsed: false,
  SIDEBAR_WIDTH: 180,
  SIDEBAR_WIDTH_COLLAPSED: 38,
  sidebarWidth: '180px'
}

export const sidebar = {
  namespaced: true,
  state: initialState,
  actions: {
    toggleSidebar({ commit, state }) {
      state.collapsed = !state.collapsed
      commit('sidebarToggle')
    },
    openSidebar({ commit, state }) {
      state.collapsed = true
      commit('sidebarToggle')
    },
    closeSidebar({ commit, state }) {
      state.collapsed = false
      commit('sidebarToggle')
    }
  },
  mutations: {
    sidebarToggle(state) {
      state.sidebarWidth = `${
        state.collapsed ? state.SIDEBAR_WIDTH_COLLAPSED : state.SIDEBAR_WIDTH
      }px `
    }
  }
}
