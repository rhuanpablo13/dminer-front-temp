<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="avisos"
    classContent="folder__notification__content"
    id="folder_notices"
    :onClick="permissionADM ? () => openAddNotices() : null"
  >
    <ul>
      <li v-for="item in $store.state.home.noticeList" :key="item.id">
        <icon-base
          viewBox="0 0 500 347.7"
          icon-name="icon"
          width="96%"
          height="100%"
        >
          <frame-notices>
            <div class="notices_container">
              <Title>
                {{ item.warning }}
              </Title>
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
            </div>
          </frame-notices>
        </icon-base>
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
import { mapState } from 'vuex'

import Title from '@/components/title/Title.vue'
import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameNotices from '@/components/svg/FrameNotices.vue'

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
        creator: this.getUser
      }
    }
  },
  computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    getUser: (state) => state.user.login,
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
  }),
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
    FildSelect,
    IconBase,
    FrameNotices
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
     return  this.value.hasOwnProperty('warning') && this.value?.warning !== "" && 
              this.value.hasOwnProperty('priority') && this.value?.priority !== 0 &&
              this.value.hasOwnProperty('users') && this.value?.users !== "" && 
              this.value.hasOwnProperty('creator') && this.value?.creator !== "" &&  
              this.value.hasOwnProperty('date') && this.value?.date !== "" 
    }
  }
}
</script>

<style scoped>

.notices_container {
  justify-content: center;
  display: grid;
}

.folder__notification__content {
  width: 108%;
  margin-left: -12px;
}

ul {
  list-style-type: none;
}
li {
 margin-top: -1.3rem;
 margin-bottom: 2rem;
 margin-right: -1rem;
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
