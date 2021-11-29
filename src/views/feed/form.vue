<template>
  <form-modal :showModal="showModal" title="post" @submit="sendForm">
    <div class="benefit_form_container">
      <upload-image v-model="value.image" :propsImage="value.image" />
      <div class="benefit_form_container_text">
        <fild-input
          text="Tópico"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-input
          text="Post"
          v-model="value.content"
          :value="value.content"
          required
        />

        <fild-select
          text="Tipo"
          v-model="value.type"
          :value="value.type"
          required
          :options="typeList"
        />
      </div>
    </div>
  </form-modal>
</template>

<script>
import { reactive } from 'vue'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import UploadImage from '@/components/UploadImage.vue'

import useFeed from '@/composables/useFeed'
import { dateHourFormarUs } from '@/util/date'

export default {
  components: {
    FildInput,
    FormModal,
    FildSelect,
    UploadImage
  },
  props: {
    showModal: { type: Boolean, required: true, default: false },
    isEdit: false
  },
  setup() {
    const typeList = [
      { id: 0, name: 'Interno' },
      { id: 1, name: 'Externo' }
    ]

    const value = reactive({
      title: '',
      content: '',
      permissions: 0,
      image: null,
      type: typeList[0]
    })

    const { create, update } = useFeed()

    return { create, typeList, update, value }
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
      this.value.date = dateHourFormarUs(new Date())
      this.value.login = this.$store.state.user.login

      return

      // return Object.values(this.value).every((item) => !!item)
    }
  }
}
</script>

<style scope>
.benefit_form_container {
  display: flex;
  height: 100%;
  margin: auto;
  padding: 2rem;

  width: 80%;
  margin: auto;
  gap: 1rem;
  justify-content: center;
  font-size: 0.8rem;
}

.benefit_form_container_text {
  display: grid;
}
</style>
