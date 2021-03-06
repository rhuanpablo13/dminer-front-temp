<script >
import { ref, reactive, watchEffect } from 'vue'
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import { useStore } from 'vuex'

export default {
  setup() {
    const id = ref(10)
    const { state, dispatch } = useStore()
    const login = state.user.login

    dispatch('calendar/setEventsAll')

    const options = reactive({
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,listDay'
      },
      buttonText: {
        today: 'hoje',
        month: 'mês',
        week: 'semana',
        day: 'dia',
        list: 'lista'
      },
      locale: 'pt-BR',
      editable: true,
      selectable: true,
      weekends: true,
      dayMaxEventRows: true,
      views: {
        timeGrid: {
          dayMaxEventRows: 6 // adjust to 6 only for timeGridWeek/timeGridDay
        }
      },

      // select: (arg) => {
      //   id.value = id.value + 1

      //   const cal = arg.view.calendar
      //   cal.unselect()
      //   cal.addEvent({
      //     id: `${id.value}`,
      //     title: `New event ${id.value}`,
      //     start: arg.start,
      //     end: arg.end,
      //     allDay: true
      //   })
      // },
      eventClick: (arg) => {
        if (arg.event) {
          arg.event.remove()
        }
      },
      events: state.calendar.events || [] ,
      eventAdd: (arg) => {
        const formatStart = moment(arg.start).format('YYYY-MM-DD hh:mm:ss')
        const formatEnd = moment(arg.end).format('YYYY-MM-DD hh:mm:ss')

        dispatch('calendar/create', {
          id: arg.event.id,
          title: arg.event.title,
          start: formatStart,
          end: formatEnd,
          allDay: arg.event.allDay,
          users:  arg.event.users || [],
          creator: login
        })
      },
      eventChange: (arg) => {
        dispatch('calendar/update',
          {
            id: arg.event.id,
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
            allDay: arg.event.allDay,
            users:  arg.event.users|| [],
            creator: login
          },
          arg.event.id
        )
      },
      eventRemove: (arg) => {
        dispatch('calendar/delete', arg.event.id)
      }
    })

    watchEffect(() => {
      options.events = state.calendar.events
    })

    return { options }
  },
  components: {
    FullCalendar
  }
}
</script>

<template>
  <FullCalendar :options="options" />
</template>
<style>
table[style] {
  width: 100% !important;
}

.fc {
  font-size: 0.3rem;
  font-family: var(--font-family--text);
  font-weight: var(--font-weight--text);
}
.fc-scrollgrid-sync-table[style] {
  width: 100% !important;
  height: 100% !important;
}

.fc-daygrid-body[style],
.fc-daygrid-body-unbalanced[style] {
  width: 100% !important;
  height: 100%;
}

.fc .fc-button-primary {
  color: #000;
  background-color: var(--sidebar-green-ligth);
  border-color: var(--fc-button-border-color, var(--sidebar-green-ligth));
  box-shadow: none;
}

.fc .fc-button-primary:not(:disabled):active,
.fc .fc-button-primary:not(:disabled).fc-button-active {
  color: #000;
  background-color: var(--sidebar-green-dark);
  border-color: var(--fc-button-border-color, var(--sidebar-green-dark));
  box-shadow: none;
}

.fc .fc-button-primary:not(:disabled):active:focus,
.fc .fc-button-primary:not(:disabled).fc-button-active:focus {
  box-shadow: none;
}

.fc .fc-button-primary:disabled {
  box-shadow: none;
}

.fc .fc-button-primary:hover {
  color: #fff;
  background-color: var(--sidebar-green-dark);
  border-color: var(--fc-button-border-color, var(--sidebar-green-dark));
}

.fc-h-event {
  display: block;
  /* border: 1px solid var(--sidebar-green-dark);
  background-color: var(--sidebar-green-dark); */
  color: #000;
}

.fc-daygrid-event-dot {
  margin: 0 4px;
  box-sizing: content-box;
  width: 0;
  height: 0;
  border: calc(var(--fc-daygrid-event-dot-width, 8px) / 2) solid;
  border-radius: 4px;
  border-radius: calc(var(--fc-daygrid-event-dot-width, 8px) / 2);
}

.fc-h-event .fc-event-title {
  display: inline-block;
  vertical-align: top;
  left: 0;
  right: 0;
  max-width: 100%;
  overflow: hidden;
  font-size: 0.4rem;
  color: black;
  font-family: var(--font-family--text);
}
</style>
