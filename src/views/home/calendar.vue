<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="calendário"
    id="show-modal"
    :onClick="() => clickCalendar()"
  >
    <div class="container__calendar">
      <calendar :ref="calendar" />
    </div>
  </widget-layout-home>

  <transition name="modal">
    <widget-modal
      layout="icon-modal"
      viewbox="0 0 500 350"
      v-if="showModal"
      @close="showModal = false"
      classButton="modal-default-button-calendar"
      width="300px"
    >
      <template v-slot:left>
        <fild-input
          :text="'Título'"
          v-model="event.title"
          :value="event.title"
          required
          :isError="isError && !event.title"
        />

        <fild-date
          :text="'Início'"
          v-model="event.start"
          :value="event.start"
          required
          :isError="isError && !event.start"
        />
        <fild-date
          :text="'Fim'"
          v-model="event.end"
          :value="event.end"
          required
          :isError="isError && !event.end"
        />

        <div>
          <send
            :isLoading="isLoading"
            :isSuccess="isSuccess"
            :isError="isError"
            @click="sendEvent"
            width="100%"
          ></send>
        </div>
      </template>
      <template v-slot:body>
        <EventCalendar :events="events" />
      </template>
    </widget-modal>
  </transition>
</template>

<script>
import { reactive, ref } from 'vue'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import Send from '@/components/button/Send.vue'
import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import EventCalendar from '@/components/calendar/EventCalendar.vue'

import useEvents from '@/composables/useEvents'
import { dateHourFormarUs } from '@/util/date.js'

const { createEvent, getEvents } = useEvents()

export default {
  data() {
    return {
      showModal: false,
      showDate: new Date(),
      events: [],
      buttonComponent: 'icon-button-send',
      isLoading: false,
      isSuccess: false,
      isError: false
    }
  },
  setup(props) {
    const calendar = ref([])
    const event = reactive({
      start: new Date(),
      end: new Date(),
      title: '',
      allDay: true
    })

    return {
      event,
      calendar
    }
  },

  components: {
    WidgetLayoutHome,
    WidgetModal,
    Calendar,
    EventCalendar,
    Send,
    FildInput,
    FildDate
  },
  methods: {
    clickCalendar() {
      this.showModal = true
    },
    setShowDate(d) {
      this.showDate = d
    },
    async sendEvent() {
      this.isLoading = true

      const result = await createEvent({
        ...this.event,
        start: dateHourFormarUs(this.event.start),
        end: dateHourFormarUs(this.event.end)
      })

      if (result.errors.length === 0) {
        this.isLoading = false
        this.isSuccess = true

        setTimeout(() => {
          this.isSuccess = false
        }, 3000)

        this.calendar.value.events = getEvents.value
      } else {
        this.isLoading = false
        this.isError = true

        setTimeout(() => {
          this.isError = false
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
.container__calendar {
  padding: 0 1.5rem;
}

.vc-container {
  border-color: none;
}
</style>
