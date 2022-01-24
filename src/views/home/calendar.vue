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
      v-if="showModal"
      @close="showModal = false"
      width="100%"
      classButton="modal_calendar_button"
      :overflow="false"
    >
      <template v-slot:body>
        <div class="calendar_container">
          <div class="form_calendar_container">
            <div class="form_calendar">
              <fild-input
                text="Título"
                v-model="eventCalendar.title"
                :value="eventCalendar.title"
                required
                :isError="isError && !eventCalendar.title"
              />

              <fild-date
                text="Início"
                v-model="eventCalendar.start"
                :value="eventCalendar.start"
                required
                :isError="isError && !eventCalendar.start"
              />
              <fild-date
                text="Fim"
                v-model="eventCalendar.end"
                :value="eventCalendar.end"
                :required="false"
                :isError="isError && !eventCalendar.end"
              />
              <fild-select
                text="Usuários"
                v-model="eventCalendar.users"
                :value="eventCalendar.users"
                required
                :options="dropdownUser"
                :multiple="true"
              />

              <fild-color text="Cor" v-model="eventCalendar.backgroundColor" :required="false"></fild-color>

              <div>
                <fild-checkbox
                  text="Dia inteiro"
                  v-model="eventCalendar.allDay"
                  type="checkbox"
                />
              </div>

              <div>
                <div class="calendar_form_button"> 
                  <send
                    :isLoading="isLoading"
                    :isSuccess="isSuccess"
                    :isError="isError"
                    @click="sendEvent"
                    width="100%"
                  ></send>
                </div>
              </div>
            </div>
          </div>
          <div class="container_calendar">
            <EventCalendar :events="events" />
          </div>
        </div>
      </template>
    </widget-modal>
  </transition>
</template>

<script>
import { reactive, ref } from 'vue'
import { mapState } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import Send from '@/components/button/Send.vue'
import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildColor from '@/components/input/FildColor.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import EventCalendar from '@/components/calendar/EventCalendar.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'

import { dateHourFormarUs } from '@/util/date.js'


export default {
  data() {
    return {
      showModal: false,
      showDate: new Date(),
      events: [],
      buttonComponent: 'icon-button-send',
    }
  },
  setup(props) {
    const calendar = ref([])
    const eventCalendar = reactive({
      start: null,
      end: null,
      title: '',
      allDay: false,
      users: [],
      creator: '', 
      borderColor: '', 
      backgroundColor: '', 
    })

    return {
      eventCalendar,
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
    FildDate,
    FildSelect,
    FildColor,
    FildCheckbox
  },
  computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    login: (state) => state.user.login,
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR'
  }),
  methods: {
    clickCalendar() {
      this.showModal = true
    },
    setShowDate(d) {
      this.showDate = d
    },
    sendEvent() {
      if(this.validForm()) {
        this.$store.dispatch('calendar/create', {
          ...this.eventCalendar,
          creator: this.login,
          allDay: this.eventCalendar.allDay === 'on',
          start: dateHourFormarUs(this.eventCalendar.start),
          end: dateHourFormarUs(this.eventCalendar.end || this.eventCalendar.start),
          borderColor: this.eventCalendar.backgroundColor,
          users: this.eventCalendar.users.length ? [this.eventCalendar.users] : this.eventCalendar.users
        })
      } else {
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      return  this.eventCalendar.hasOwnProperty('title') && this.eventCalendar?.title !== "" && 
              this.eventCalendar.hasOwnProperty('start') && this.eventCalendar?.start !== null
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

.calendar_container {
  display: grid;
  grid-template-columns: 10rem auto;
  gap: 1rem;
  margin-left: 3.5rem;
  margin-top: 2rem;
}

.form_calendar_container {
  position: relative;
}

.form_calendar {
  font-size: 0.4rem;
  position: absolute;
  top: -50%;
  transform: translate(0, 50%);
  height: 18rem;
}

.calendar_form_button{
  width: 50%;
  margin: auto;
  margin-top: -1rem;
}

.container_calendar{
  margin-top:-2rem;
}

</style>
