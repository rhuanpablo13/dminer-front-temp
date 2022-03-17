
export const version = {
  namespaced: true,
  state: process.env.PACKAGE_VERSION || '0.0.0',
  getters: {
      appVersion: (state) => {
        return state.packageVersion
      }
  }
}
