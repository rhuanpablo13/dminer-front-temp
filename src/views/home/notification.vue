<template>
  <widget-layout-home
    layout="icon-folder"
    class="mt-3 cursor-move"
    title="notificações"
    classContent="folder__notification__content"
    :onClick="openModal"
  >
    <ul>
      <li v-for="item in $store.state.home.notificationlist" :key="item.id">
        <icon-base
          viewBox="0 0 500 85.1"
          icon-name="icon"
          width="100%"
          height="100%"
        >
          <frame-notification>
            <Title>
              {{ item.notification }}
            </Title>
          </frame-notification>
        </icon-base>
      </li>
    </ul>
  </widget-layout-home>

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
import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildInput from '@/components/input/Fild.vue'
import IconBase from '@/components/svg/IconBase.vue'
import Title from '@/components/title/Title.vue'
import FrameNotification from '@/components/svg/FrameNotification.vue'

import useNotification from '@/composables/useNotification'

export default {
  data() {
    return {
      showModal: false,
      value: {
        notification: '',
        userId: this.$store.state.user.login
      }
    }
  },
  setup() {
    const { create } = useNotification()
    return { create }
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
      return Object.values(this.value).every((item) => !!item)
    },
    openModal() {
      this.showModal = true
    }
  },
  components: {
    Title,
    WidgetLayoutHome,
    IconBase,
    FormModal,
    FildInput,
    FrameNotification
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
</style>
