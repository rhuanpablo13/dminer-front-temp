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
              <div class="calendar_fild">
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
                  :minDate="minDateNow()"
                />
                <fild-date
                  text="Fim"
                  v-model="eventCalendar.end"
                  :value="eventCalendar.end"
                  :required="false"
                  :isError="isError && !eventCalendar.end"
                  :minDate="eventCalendar.start"
                />
                <fild-multi-select
                  text="Usuários"
                  v-model="eventCalendar.users"
                  :value="eventCalendar.users"
                  required
                  :options="dropdownUser"
                />

                <fild-color text="Cor" v-model="eventCalendar.backgroundColor" :required="false"></fild-color>

                <div>
                  <fild-checkbox
                    text="Dia inteiro"
                    v-model="eventCalendar.allDay"
                    type="checkbox"
                  />
                </div>
              </div>

              <div>
                <div class="calendar_form_button"> 
                  <send
                     id="sendCalensar"
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
import { mapState, useStore } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import Send from '@/components/button/Send.vue'
import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildColor from '@/components/input/FildColor.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import EventCalendar from '@/components/calendar/EventCalendar.vue'
import FildMultiSelect from '@/components/input/FildMultiSelect.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'

import { dateHourFormarUs, minDateNow } from '@/util/date.js'


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
    const { dispatch } = useStore()
    dispatch('dropdown/getDropdownUser')

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
      calendar,
      minDateNow
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
    FildMultiSelect,
    FildColor,
    FildCheckbox
  },
  computed: mapState({
    dropdownUser: (state) =>  state.dropdown.user.map(us => {
      return {
        value: us.login,
        name: us.userName,
        image: us.avatar
      }
    }) || [],
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
          users: this.eventCalendar.users
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

<style >
.container__calendar {
  padding: 0 1.5rem;
}

.vc-container {
  border-color: none;
}

.calendar_container {
  display: grid;
  grid-template-columns: 13rem auto;
  gap: 1rem;
  margin-left: 3.5rem;
  margin-top: 2rem;
}

.form_calendar_container {
  overflow-y: hidden;
  width: 13rem;
  margin-top: -2rem;
  font-size: 0.4rem;
}

.form_calendar {
  /* font-size: 0.4rem;
  position: absolute;
  top: -59%;
  transform: translate(0, 50%);
  max-height: 25rem;
  overflow-y: auto;
  width: 11.5rem;
  left: -1rem;
  overflow-x: hidden; */
}

.multiselect-tag {
  background: var(--ms-tag-bg,#10b981);
  color: var(--ms-tag-color,#fff);
  font-size: 0.5rem !important;
  line-height: var(--ms-tag-line-height,1.25rem);
  font-family: var(--font-family--text) !important;
  padding: 0.1rem;
  padding-left: 0.3rem !important;
  border-radius: var(--ms-tag-radius,4px);
  margin-right: var(--ms-tag-mx,.25rem);
  margin-bottom: var(--ms-tag-my,.25rem);
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.multiselect-option {
  padding: var(--ms-option-py,.5rem) var(--ms-option-px,.75rem);
  font-size: 0.6rem !important;
  line-height: var(--ms-option-line-height,1.375);
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}

.multiselect-dropdown {
  position: absolute;
  left: calc(var(--ms-border-width, 1px)*-1);
  right: calc(var(--ms-border-width, 1px)*-1);
  bottom: 0;
  transform: translateY(100%);
  border: var(--ms-dropdown-border-width,1px) solid var(--ms-dropdown-border-color,#d1d5db);
  margin-top: calc(var(--ms-border-width, 1px)*-1);
  max-height: 15rem;
  overflow-y: scroll;
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
  background: var(--ms-dropdown-bg,#fff);
  display: flex;
  flex-direction: column;
  border-radius: 0 0 var(--ms-dropdown-radius,4px) var(--ms-dropdown-radius,4px);
  outline: none;
}

.calendar_form_button{
  width: 50%;
  margin: auto;
  margin-top: -1rem;
}

.container_calendar{
  margin-top:-2rem;
}

#sendCalensar > foreignObject > span {
  font-size: 6rem !important;
}

.calendar_fild {
  overflow-y: auto;
  height: 20rem;
}

.fc .fc-popover {
    position: absolute;
    z-index: 999999999999999;
    box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
}

div[id^="fc-dom-"]{
  top: 0 !important;
  left: 0 !important;
}
</style>
