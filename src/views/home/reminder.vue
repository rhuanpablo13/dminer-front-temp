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
        <Title>
          {{ item.reminderDescrible }}
        </Title>
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

import Title from '@/components/title/Title.vue'

import useReminder from '@/composables/useReminder.js'
import { dateHourFormart } from '@/util/date.js'

export default {
  data() {
    return {
      showModal: false,
      value: {
        dataHora: new Date(),
        reminder: ''
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
    Title,
    FormModal,
    FildDate,
    FildInput,
    FildSelect
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
}
li {
  height: 15vh;
  margin-bottom: 1.6rem;
  width: 90%;
  padding: 1rem;
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
</style>
