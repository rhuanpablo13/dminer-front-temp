<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de benefícios"
    @submit="sendForm"
  >
    <div class="benefit_form_container">
      <upload-image v-model="value.image" :propsImage="value.image" />
      <div class="benefit_form_container_text">
        <fild-input
          :text="'Título'"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-input
          :text="'Conteúdo'"
          v-model="value.content"
          :value="value.content"
          required
        />

        <fild-select
          :text="'Permissão'"
          v-model="value.permission"
          :value="value.permission"
          required
          :options="dropdownPermission"
        />
      </div>
    </div>
  </form-modal>
</template>

<script>
import { mapState } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import UploadImage from '@/components/UploadImage.vue'

import useBenefit from '@/composables/useBenefit'
import { dateHourFormarUs } from '@/util/date'

export default {
  components: {
    FildInput,
    FormModal,
    FildSelect,
    UploadImage
  },
  props: {
    showModal: { type: Boolean, required: true },
    isEdit: false,
    value: {
      type: Object,
      required: false,
      default: {
        title: '',
        content: '',
        permissions: 0,
        image: null
      }
    }
  },
  setup() {
    const { create, update } = useBenefit()

    return { create, update }
  },

  computed: mapState({
    dropdownPermission: (state) => state.dropdown.permissions,
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
      this.value.creator = this.$store.state.user.login
      return  this.value.hasOwnProperty('title') && this.value?.title !== "" && 
              this.value.hasOwnProperty('content') && this.value?.content !== "" &&
              this.value.hasOwnProperty('permission') && this.value?.permission !== 0 && 
              this.value.hasOwnProperty('image') && this.value?.image
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
}

.benefit_form_container_text {
  display: grid;
}
</style>
