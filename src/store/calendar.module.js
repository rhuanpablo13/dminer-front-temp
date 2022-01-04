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
      return createEvent(value).then(
        () => {
         this.dispatch('calendar/setEventsAll')
         messagesFetch('registration', 200, null)
        },
        (error) => {
          console.log(error)
          commit('failure')
          messagesFetch('registration', 400, null)
          return Promise.reject(error)
        }
      )
    },
    update({ commit }, value) {
      return updateEvent(value, value.id).then(
        () => {
         this.dispatch('calendar/setEventsAll')
         messagesFetch('update', 200, null)
        },
        (error) => {
          console.log(error)
          commit('failure')
          messagesFetch('update', 400, null)
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return deleteEvent(id).then(
        () => {
         this.dispatch('calendar/setEventsAll')
         messagesFetch('delete', 200, null)
        },
        (error) => {
          console.log(error)
          commit('failure')
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
