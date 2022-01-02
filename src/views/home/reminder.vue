<template>
  <widget-layout-home
    layout="icon-folder"
    title="lembrete"
    classContent="folder__reminder__content"
    :onClick="openModal"
  >
    <ul>
      <li
        class="reminder_li"
        v-for="(item, key) in $store.state.home.reminderList"
        :key="key"
        :id="`reminder_li_${key}`"
      >
        <icon-base
          viewBox="0 0 500 85.1"
          icon-name="icon"
          width="100%"
          height="100%"
        >
          <frame-notification>
            <div class="reminder">
              <fild-checkbox
                :text="item.reminder"
                v-model="value.active"
                :value="!!value.active"
                type="checkbox"
                @change="change(item)"
              />
            </div>
          </frame-notification>
        </icon-base>
      </li>
    </ul>
  </widget-layout-home>

  <form-modal
    :showModal="showModal"
    title="cadastro de lembrete"
    @submit="sendForm"
    @close="showModal = false"
  >
    <div class="form_container">
      <div class="form_container_text">
        <fild-input
          text="Lembrete"
          v-model="value.reminder"
          :value="value.reminder"
          required
        />

        <fild-date
          text="Data"
          v-model="value.date"
          :value="value.date"
          required
        />
       
      </div>
    </div>
  </form-modal>
</template>

<script>
import { mapState } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FormModal from '@/components/FormModal.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import FrameNotification from '@/components/svg/FrameNotification.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'

import useReminder from '@/composables/useReminder.js'
import { dateHourFormart, dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
      showModal: false,
      value: {
        date: new Date(),
        reminder: '',
        login: this.getUser
      }
    }
  },
  setup() {
    const { updateCount, create, setReminder } = useReminder()

    return { dateHourFormart, updateCount, create, setReminder }
  },
    computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    getUser: (state) => state.user.login
  }),
  methods: {
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        this.value.date  =  dateHourFormarUs(this.value.date)
        this.value.action  = false

        let result = this.isEdit
          ? this.update(this.value)
          : this.create(this.value)

        this.$store.dispatch('form/setLoading')
        if (result) {
          const login = this.getUser
          this.$store.dispatch('form/setSuccess').then(() => {
            this.setReminder(login)
            this.showModal = false
          })
        }
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.login = this.getUser
      return  this.value.hasOwnProperty('reminder') && this.value?.reminder !== "" && 
              this.value.hasOwnProperty('date') && this.value?.date !== ""
    },
    openModal() {
      this.showModal = true
    }, 
    change(item) {
      item.active = !item.active
      this.$store.dispatch('home/reminderCheck', item)
    }
  },
  components: {
    WidgetLayoutHome,
    FormModal,
    FildDate,
    FildInput,
    FildSelect,
    FrameNotification,
    IconBase,
    FildCheckbox
  }
}
</script>

<style scoped>
.folder__reminder__content {
  width: 108%;
  margin-left: -12px;
}

ul {
  list-style-type: none;
  display: grid;
}

li {
  margin-bottom: 1rem;
}

.reminder_footer {
  display: inline-grid;
  text-transform: uppercase;
}

.form_container {
  display: grid;

  width: 100%;
  height: 100%;
  margin: auto;
  justify-items: stretch;
  padding: 2rem;

  width: 80%;
  margin: auto;
}

.form_container_text {
  display: grid;
  grid-template-columns: 45% 45%;
  grid-gap: 10%;
}

.reminder {
  font-size: 1.8rem;
  margin: 0.5rem 1.2rem;
  word-wrap: break-word;
  width: 25rem;
  height: 100%;
}
</style>
