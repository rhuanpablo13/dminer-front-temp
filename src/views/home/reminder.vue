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
          viewBox="0 0 500 500"
          icon-name="icon"
          width="100%"
          height="100%"
        >
          <frame-notification>
            <div class="reminder">
              <fild-checkbox
                :text="item.reminderDescrible"
                v-model="value.active"
                :value="value.active"
                type="checkbox"
              />
            </div>

            <!-- <Title>
                {{ item.reminderDescrible }}
              </Title> -->
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
          :text="'Título'"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-input
          :text="'Link'"
          v-model="value.contentLink"
          :value="value.contentLink"
          required
        />
        <fild-select
          :text="'Permissão'"
          v-model="value.permission"
          :value="value.permission"
          required
          :options="getPermission"
        />

        <fild-select
          :text="'Categoria'"
          v-model="value.category"
          :value="value.category"
          required
          :options="getCategories"
        />
      </div>
    </div>
  </form-modal>
</template>

<script>
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FormModal from '@/components/FormModal.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import FrameNotification from '@/components/svg/FrameNotification.vue'
// import Title from '@/components/title/Title.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'

import useReminder from '@/composables/useReminder.js'
import { dateHourFormart } from '@/util/date.js'

export default {
  data() {
    return {
      showModal: false,
      value: {
        dataHora: new Date(),
        reminder: '',
        active: false
      }
    }
  },
  setup() {
    const { updateCount, create } = useReminder()

    return { dateHourFormart, updateCount, create }
  },
  methods: {
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        let result = this.isEdit
          ? this.update(this.value)
          : this.create(this.value)

        this.$store.dispatch('form/setLoading')
        if (result) {
          this.$store.dispatch('form/setSuccess').then(() => {
            this.$emit('close')
          })
        }
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.login = this.$store.state.user.login
      return Object.values(this.value).every((item) => !!item)
    },
    openModal() {
      this.showModal = true
    }
  },
  components: {
    WidgetLayoutHome,
    // Title,
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
  margin-bottom: -21rem;
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
}
</style>
