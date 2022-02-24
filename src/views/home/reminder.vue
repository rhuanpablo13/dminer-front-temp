<template>
  <widget-layout-home
    layout="icon-folder"
    title="lembrete"
    classContent="folder__reminder__content"
    :onClick="openModal"
    hasButton
    :noRegistry="!list.length"
    :typeList="typeList"
  >
    <ul>
      <li
        class="reminder_li"
        v-for="(item, key) in list"
        :key="key"
        :id="`reminder_li_${key}`"
        :style="{'cursor': permissionADM ? 'pointer' : 'default'}" @click="permissionADM && setDoc(item)"
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
                v-model="item.checked"
                :value="item.checked"
                type="checkbox"
                @change="change(item)"
              />
            </div>
          </frame-notification>
        </icon-base>
      </li>
    </ul>
  </widget-layout-home>

  <transition name="modal">
    <widget-modal
      v-if="showModalView"
      title="Lembrete"
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
            <span> {{ itemView.login }} | {{dateHourFormart(itemView.date)}}</span>
          </div>

          <div class="reminder">
              <fild-checkbox
                :text="itemView.reminder"
                v-model="itemView.checked"
                :value="itemView.checked"
                type="checkbox"
                @change="change(itemView, true)"
                full
              />
            </div>
        </div>
      </template>
    </widget-modal>
  </transition>

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
import IconEdit from '@/components/svg/IconEdit.vue'
import IconTrash from '@/components/svg/IconTrash.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import Title from '@/components/title/Title.vue'

import { dateHourFormart, dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
      typeList: 'reminder',
      showModal: false,
      isEdit: false,
      showModalView: false,
      value: {
        date: new Date(),
        reminder: '',
        login: '',
        checked: false
      }
    }
  },
  setup() {
    return { dateHourFormart }
  },
  computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    getUser: (state) => state.user.login,
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
    list: (state) => state.home.reminderList
  }),
  methods: {
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        this.value.date  =  dateHourFormarUs(this.value.date)
        this.value.action  = false

        this.$store.dispatch(
          this.isEdit ? 'home/updateItemList' : 'home/createItemList', 
          {
            typeList: this.typeList, 
            value: this.value,
            hasLogin: true,
            login: this.getUser,
          }
        )
        this.showModal = false
      } else {
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.login = this.getUser
      return  this.value.hasOwnProperty('reminder') && this.value?.reminder !== "" && 
              this.value.hasOwnProperty('date') && this.value?.date !== ""
    },
    openModal() {
      this.$store.dispatch('list/setNoRegistry', false)

      this.showModal = true
    }, 
    change(item, local) {
      item.checked = !item.checked
      this.$store.dispatch('home/updateItemList',           
      {
        typeList: this.typeList, 
        value: item,
        hasLogin: true,
        login: this.getUser
      })
      if (local) {
        this.itemView.checked = !this.itemView.checked
      }
    },
    setDoc(_item) {
      this.$store.dispatch('list/setNoRegistry', false)
      this.showModalView = true
      this.itemView = _item
    },
    edit(value) {
      this.isEdit = true
      this.value = value
      this.showModal = true
    },
    deleteBenefit(id) {
      this.$store.dispatch('home/deleteItemList', {
        typeList:this.typeList, 
        id, 
        hasLogin: true,
        login: this.getUser
      })
      this.showModalView = false
    },
  },
  components: {
    WidgetLayoutHome,
    FormModal,
    FildDate,
    FildInput,
    FildSelect,
    FrameNotification,
    IconBase,
    FildCheckbox,
    IconEdit,
    IconTrash,
    WidgetModal,
    Title
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
