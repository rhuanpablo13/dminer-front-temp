<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de benefícios"
    @submit="sendForm"
  >
   <template v-slot:body>
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
   </template>
  </form-modal>
</template>

<script>
import { mapState, useStore } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import UploadImage from '@/components/UploadImage.vue'

import { dateHourFormarUs } from '@/util/date'

export default {
  setup() {
    const store = useStore()
    store.dispatch('dropdown/getDropdownPermission')

    return { dispatch: store.dispatch }
  },
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
        permission: 0,
        image: null
      }
    }
  },
  computed: mapState({
    dropdownPermission: (state) => state.dropdown.permissions,
  }),

  methods: {
    sendForm() {
      if (this.validForm()) {
       this.dispatch(
          this.isEdit ? 'list/updateItemList' : 'list/createItemList', 
          {typeList: 'benefits', 
          value: this.value}
        )
        this.$emit('close')
      } else {
       this.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.date = dateHourFormarUs(new Date())
      this.value.creator = this.$store.state.user.login
      return  this.value.hasOwnProperty('title') && this.value?.title !== "" && 
              this.value.hasOwnProperty('content') && this.value?.content !== "" &&
              this.value.hasOwnProperty('permission') && 
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
