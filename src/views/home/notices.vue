<template>
  <widget-layout-home
    layout="icon-notices"
    class="mt-3 cursor-move"
    classContent="folder__notification__content"
    id="folder_notices"
    :onClick="openAddNotices"
  >
    <ul>
      <li
        class="notifices_li"
        v-for="item in $store.state.home.noticeList"
        :key="item.id"
        :id="`notifices_li_${key}`"
      >
        <Title>
          {{ item.creator }}
        </Title>
        <span class="">{{ item.warning }}</span>
        <div class="notices_footer">
          <span>
            <b>Prioridade:</b>
            {{ getPriority(item.priority) }}
          </span>

          <br />
          <span>
            <b>Data:</b>
            {{ dateHourFormart(item.date) }}
          </span>
        </div>
      </li>
    </ul>
  </widget-layout-home>

  <form-modal
    :showModal="showModal"
    title="cadastro de avisos"
    @submit="sendForm"
    @close="showModal = false"
  >
    <div class="form_container">
      <div class="form_container_text">
        <fild-input
          :text="'Título'"
          v-model="value.warning"
          :value="value.warning"
          required
        />

        <fild-select
          :text="'Prioridade'"
          v-model="value.priority"
          :value="value.priority"
          required
          :options="priorityList"
        />

        <fild-select
          :text="'Usuários'"
          v-model="value.users"
          :value="value.users"
          required
          :options="dropdownUser"
          :multiple="true"
        />

        <fild-date
          :text="'Data'"
          v-model="value.date"
          :value="value.date"
          required
        />
      </div>
    </div>
  </form-modal>
</template>

<script>
import Title from '@/components/title/Title.vue'
import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'

import useNotice from '@/composables/useNotice.js'
import { dateHourFormart, dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
      showModal: false,
      lastScrollTop: 0,
      priorityList: [
        {
          id: 1,
          title: 'Alta'
        },
        {
          id: 2,
          title: 'Média'
        },
        {
          id: 3,
          title: 'Baixa'
        }
      ],
      value: {
        warning: '',
        date: new Date(),
        priority: 'Média',
        users: [],
        creator: this.$store.state.user.login
      }
    }
  },
  computed: {
    dropdownUser() { return  this.$store.state.dropdown.user}
  },
  setup() {
    const { getNotices, create } = useNotice()
    return { getNotices, create, dateHourFormart }
  },
  components: {
    Title,
    WidgetLayoutHome,
    FormModal,
    FildInput,
    FildDate,
    FildSelect
  },
  methods: {
    openAddNotices() {
      this.showModal = true
    },
    getPriority(id) {
     const priority = this.priorityList.filter(item => item.id === id);

      return priority[0].title
    },
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        this.value.users = [this.value.users]
        this.value.date  =  dateHourFormarUs( this.value.date)

        let result = this.isEdit
          ? this.update(this.value)
          : this.create(this.value)

        this.$store.dispatch('form/setLoading')
        if (result) {
          this.$store.dispatch('form/setSuccess')
          this.showModal = false
        }
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      return Object.values(this.value).every((item) => !!item)
    }
  }
}
</script>

<style scoped>
.folder__notification__content {
  width: 108%;
  margin-left: -12px;
}
ul {
  list-style-type: none;
}
li {
  height: 38vh;
  padding: 1rem;
}

.notices_footer {
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
