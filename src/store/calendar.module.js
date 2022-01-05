import useEvents from '@/composables/useEvents'
// import { messagesFetch } from '@/util/toast.js'


const { setEvents, getEvents, createEvent, updateEvent, deleteEvent  } = useEvents()

const initialState = {
  events: []
}

export const calendar = {
  namespaced: true,
  state: initialState,
  actions: {
    setEventsAll({ commit }) {
      return setEvents(this.state.user.login).then(
        () => {
          commit('success', getEvents.value)
        },
        (error) => {
          console.log(error)
          commit('failure')
          // messagesFetch('login', 400, null)
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, value) {
      this.dispatch('form/setLoading')
      return createEvent(value).then(
        () => {
         this.dispatch('form/setLoading')
         this.dispatch('calendar/setEventsAll')
        },
        (error) => {
          console.log(error)
          commit('failure')
          this.dispatch('form/setLoading')
          this.dispatch('calendar/setError')

          messagesFetch('registration', 400, null)
          return Promise.reject(error)
        }
      )
    },
    update({ commit }, value) {
      this.dispatch('form/setLoading')
      return updateEvent(value, value.id).then(
        () => {
         this.dispatch('form/setLoading')
         this.dispatch('calendar/setEventsAll')

        },
        (error) => {
          console.log(error)
          commit('failure')
          this.dispatch('form/setLoading')
          this.dispatch('calendar/setError')
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      this.dispatch('form/setLoading')
      return deleteEvent(id).then(
        () => {
          this.dispatch('form/setLoading')
         this.dispatch('calendar/setEventsAll')
         this.dispatch('calendar/setSuccess')
        },
        (error) => {
          console.log(error)
          commit('failure')
          this.dispatch('form/setLoading')
          this.dispatch('calendar/setError')
          messagesFetch('delete', 400, null)
          return Promise.reject(error)
        }
      )
    },
  },
  mutations: {
    success(state, payload) {
      state.events = payload
    },
    failure(state) {
      state.events = []
    }
  }
}
