
<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="avisos"
    classContent="folder__notification__content"
    id="folder_notices"
    :onClick="permissionADM ? () => openAddNotices() : null"
    :noRegistry="!list.length"
    :typeList="typeList"
  >
    <ul>
      <li  @click="setDoc(item)" v-for="item in list" :key="item.id">
        <icon-base
          viewBox="0 0 500 347.7"
          icon-name="icon"
          width="96%"
          height="100%"
        >
          <frame-notices style="cursor: pointer;">
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

  <transition name="modal">
    <widget-modal
      v-if="showModalView"
      title="Avisos"
      @close="showModalView = false"
    >
      <template v-slot:body>
        <div class="item_view">
          <div style="display: flex"> 
            <button class="team_btn_edit" style="margin-left: auto;" v-if="permissionADM">
              <icon-base
                icon-name="icon"
                class="team_icon_edit"
                @click="edit(itemView)"
                width="1rem"
                heigth="1rem"
              >
                <icon-edit />
              </icon-base>

              <icon-base
                icon-name="icon"
                class="team_icon_edit"
                @click="deleteBenefit(itemView.id)"
                width="1rem"
                heigth="1rem"
              >
                <icon-trash />
              </icon-base>
            </button>
          </div>
          <div style="display: flex">
            <span> {{ itemView.creator  }} | {{ dateFormart(itemView.date) }}</span>
            <span style="margin-left: auto;"> 
              <b>Prioridade:</b>
              {{ getPriority(itemView.priority) }}
            </span>
          </div>

          <Title>
            {{itemView.warning }}
          </Title>

          <div> 
            <span> Usuário(s) marcado(s): </span>
            <ul style="padding-inline-start: 0;">
              <ol style="padding-inline-start: 0;" v-for="user in itemView.users" :key="user"> {{ user.login }} </ol>
            </ul>
          </div>
        </div>
      </template>
    </widget-modal>
  </transition>

  <form-modal
    :showModal="showModal"
    title="cadastro de avisos"
    @submit="sendForm"
    @close="close"
  >
   <template v-slot:body>
    <div class="form_container">
      <div class="form_container_text">

        <fild-date
          text="Data"
          v-model="value.date"
          :value="value.date"
          required
        />

        <fild-input
          text="Título"
          v-model="value.warning"
          :value="value.warning"
          required
        />

        <fild-multi-select
          text="Usuários"
          v-model="value.users"
          :value="value.users"
          required
          :options="dropdownUser"
        />

        <fild-select
          text="Prioridade"
          v-model="value.priority"
          :value="value.priority"
          required
          :options="dropdownPriority"
        />
      </div>
    </div>
   </template>
  </form-modal>
</template>

<script>
import { mapState, useStore } from 'vuex'

import Title from '@/components/title/Title.vue'
import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildMultiSelect from '@/components/input/FildMultiSelect.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameNotices from '@/components/svg/FrameNotices.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import { dateFormart, dateFormartUs } from '@/util/date.js'
import * as translation from '@/util/pt_BR.json'

export default {
  data() {
    return {
      showModal: false,
      isEdit: false,
      showModalView: false,
    }
  },
  setup() {
    const { dispatch } = useStore()
    dispatch('dropdown/getDropdownUser', {avatar: true})

    return {
      dispatch,
      dateFormart,
      lastScrollTop: 0,
      value: {
        warning: '',
        date: new Date(),
        priority: 'Média',
        users: [],
        creator: ''
      },
      itemView: {
        notices: '',
        user: ''
      },
      typeList: 'notice',
    }
  },
  computed: mapState({
    dropdownUser: (state) =>  {
      if (!state.hasOwnProperty('dropdown') && !state.dropdown.hasOwnProperty('user')) return []
      return state.dropdown.user && state.dropdown.user.map(us => {
        return {
          value: us.login,
          name: us.userName,
          image: us.avatar
        }
      })
    },    
    getUser: (state) => state.user.login,
    permissionADM: (state) => state.user.adminUser  === translation.SYSTEM.ADMINISTRADOR,
    list: (state) => state.home.noticeList,
    dropdownPriority: (state) =>  {
      return state.dropdown.priority
    }
  }),
  components: {
    Title,
    WidgetLayoutHome,
    FormModal,
    FildInput,
    FildDate,
    FildSelect,
    FildMultiSelect,
    IconBase,
    FrameNotices,
    WidgetModal,
    IconEdit,
    IconTrash
  },
  methods: {
    getUserSelected() {
      if (this.value.users.length) {
        const users = []
        this.value.users.map(item => {
          users.push(item.login)
        })
        this.value.users = users
      }
    },
    openAddNotices() {
      this.dispatch('list/setNoRegistry', false)

      this.value = {}
      this.showModal = true
    },
    getPriority(id) {
      if ( this.dropdownPriority.length === 0 ) return 
      const priority = this.dropdownPriority.filter(item => item.id === id);
      return priority[0].name
    },
    sendForm() {
      if (this.validForm()) {
        this.value.users = this.value.users
        this.value.date  =  dateFormartUs(this.value.date)

        this.dispatch(
          this.isEdit ? 'home/updateItemList' : 'home/createItemList', 
          {typeList: this.typeList, 
          value: this.value}
        )
        this.itemView = this.value

        this.userModal()
        this.showModal = false
      } else {
        this.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.creator =  this.getUser
      return  this.value.hasOwnProperty('warning') && this.value?.warning !== "" && 
              this.value.hasOwnProperty('priority') &&
              this.value.hasOwnProperty('users') && this.value?.users !== "" && 
              this.value.hasOwnProperty('creator') && this.value?.creator !== "" &&  
              this.value.hasOwnProperty('date') && this.value?.date !== "" 
    },
    setDoc(_item) {
      this.dispatch('list/setNoRegistry', false)
      this.showModalView = true
      this.itemView = _item
    },
    edit(value) {
      this.isEdit = true
      this.value = value
      this.getUserSelected()
      this.showModal = true
    },
    deleteBenefit(id) {
      this.dispatch('home/deleteItemList', {typeList:this.typeList, id})
      this.showModalView = false
    },
    userModal() {
      if (this.value.users && this.value.users.length) {
        const items = []
  
        this.value.users.map(item => {
          const userIndex = this.dropdownUser.findIndex(us => item === us.value)
  
          if (userIndex !== -1) {
            items.push({
              login: item
            })
          }
        })
        this.itemView.users = items
      }
    },
    close() {
      this.userModal()
      this.showModal = false
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

.item_view {
  margin-left: 3rem;
  text-align: left;
}

.team_btn_edit {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
}
</style>
