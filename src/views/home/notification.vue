<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="notificações"
    classContent="folder__notification__content"
    :onClick="openModal"
  >
    <ul>
      <li @click="setDoc(item)" v-for="item in $store.state.home.notificationlist" :key="item.id" :title="item.notification">
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
    title="cadastro de enquete"
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
    const { create } = useNotification()
    return { create }
  },
  computed: mapState({
    getUser: (state) => state.user.login
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
      this.showModal = true
    },
    setDoc(_item) {
      this.showModalView = true
      this.itemView = _item
    },
  },
  components: {
    Title,
    WidgetLayoutHome,
    IconBase,
    FormModal,
    FildInput,
    FrameNotification,
    WidgetModal
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
  cursor: pointer;
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
</style>
