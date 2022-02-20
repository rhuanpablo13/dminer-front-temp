<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="notificações"
    classContent="folder__notification__content"
    :onClick="permissionADM ? () => openModal() : null"
  >
    <ul>
      <li :style="{'cursor': permissionADM ? 'pointer' : 'default'}" @click="permissionADM && setDoc(item)" v-for="item in $store.state.home.notificationlist" :key="item.id" :title="item.notification">
        <icon-base
          viewBox="0 0 500 85.1"
          icon-name="icon"
          width="100%"
          height="100%"
        >
          <frame-notification>
            <h2>
              {{item.notification}}
            </h2>
          </frame-notification>
        </icon-base>
      </li>
    </ul>
  </widget-layout-home>

  <transition name="modal">
    <widget-modal
      v-if="showModalView"
      title="Notificação"
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
          <span> {{itemView.login }}</span>
          <Title>
            {{itemView.notification }}
          </Title>
        </div>
      </template>
    </widget-modal>
  </transition>

  <form-modal
    :showModal="showModal"
    title="cadastro de notificação"
    @submit="sendForm"
    @close="showModal = false"
  >
    <div class="form_container">
      <fild-input
        :text="'Notificação'"
        v-model="value.notification"
        :value="value.notification"
        required
      />
    </div>
  </form-modal>
</template>

<script>
import { mapState } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import FildInput from '@/components/input/Fild.vue'
import IconBase from '@/components/svg/IconBase.vue'
import Title from '@/components/title/Title.vue'
import FrameNotification from '@/components/svg/FrameNotification.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconTrash from '@/components/svg/IconTrash.vue'
import useNotification from '@/composables/useNotification'

export default {
  data() {
    return {
      showModal: false,
      showModalView: false,
      value: {
        notification: '',
        idUser: this.getUser
      },
      itemView: {
        notification: '',
        user: ''
      }
    }
  },
  setup() {
    const { create, deleteItem, update } = useNotification()
    return { create, deleteItem, update }
  },
  computed: mapState({
    getUser: (state) => state.user.login,
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
  }),
  methods: {
    sendForm() {
      this.$store.dispatch('form/setLoading')
      if (this.validForm()) {
        let result = this.isEdit
          ? this.update(this.value)
          : this.create(this.value)

        this.$store.dispatch('form/setLoading')
        if (result) {
          this.$store.dispatch('home/search', null)
          this.$store.dispatch('form/setSuccess').then(() => {
            this.showModal = false
          })
        }
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.idUser = this.getUser
     return  this.value.hasOwnProperty('notification') && this.value?.notification !== "" 
    },
    openModal() {
      this.value = {}
      this.showModal = true
    },
    setDoc(_item) {
      this.showModalView = true
      this.itemView = _item
    },
    edit(value) {
      this.isEdit = true
      this.value = value
      this.showModal = true
    },
    deleteBenefit(id) {
      this.deleteItem(id)
      this.$store.dispatch('home/search', null)
      this.showModalView = false
    },
  },
  components: {
    Title,
    WidgetLayoutHome,
    IconBase,
    FormModal,
    FildInput,
    FrameNotification,
    WidgetModal,
    IconEdit,
    IconTrash
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
  display: grid;
}

li {
  margin-bottom: 1rem;
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
  margin-left: 5rem;
  text-align: left;
}

h2 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20rem;
  margin-left: 2rem;;
}

.team_btn_edit {
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
}
</style>
