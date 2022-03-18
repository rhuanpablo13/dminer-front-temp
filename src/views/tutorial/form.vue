<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de tutorial"
    @submit="sendForm"
  >
   <template v-slot:body>
    <div class="tutorial_form_container">
      <upload-image v-model="value.image" :propsImage="value.image" />
      <div class="tutorial_form_container_text">
        <fild-input
          :text="'Título'"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-select
          text="Categoria"
          v-model="value.category"
          :value="value.category"
          required
          :options="dropdownCategory"
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
    <div class="tutorial_textarea">
      <fild-textarea
        text="Conteúdo"
        v-model="value.content"
        :value="value.content"
        required
      />
    </div>
   </template>
  </form-modal>
</template>

<script>
import { mapState, useStore } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildTextarea from '@/components/input/FildTextarea.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import UploadImage from '@/components/UploadImage.vue'

import { dateHourFormarUs } from '@/util/date'

export default {
  setup() {
    const store = useStore()
    store.dispatch('dropdown/getDropdownPermission')
    store.dispatch('dropdown/getDropdownCategory')

    return { dispatch: store.dispatch }
  },
  components: {
    FildInput,
    FormModal,
    FildSelect,
    UploadImage,
    FildTextarea
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
        permission: null,
        category: null,
        image: null
      }
    }
  },
  computed: mapState({
    dropdownPermission: (state) => state.dropdown.permissions,
    dropdownCategory: (state) => state.dropdown.category,
    login: (state) => state.user.login,
  }),

  methods: {
    sendForm() {
      if (this.validForm()) {
        this.dispatch(
          this.isEdit ? 'list/updateItemList' : 'list/createItemList', 
          {
            typeList: 'tutorials', 
            value: this.value
          }
        )
        this.$emit('close')
      } else {
        this.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.date = dateHourFormarUs(new Date())
      this.value.creator = this.login
      
      if (typeof(this.value.category) === 'string') {
        const indexCategory = this.dropdownCategory.findIndex(category => category.name === this.value.category)
        this.value.category = this.dropdownCategory[indexCategory].id
      }

      if (typeof(this.value.permission) === 'string') {
        this.value.permission = parseInt(this.value.permission)
      }

      return  this.value.hasOwnProperty('title') && this.value?.title !== "" && 
              this.value.hasOwnProperty('content') && this.value?.content !== "" &&
              this.value.hasOwnProperty('permission') && 
              this.value.hasOwnProperty('category') && 
              this.value.hasOwnProperty('image') && this.value?.image 
    }
  }
}
</script>

<style scope>
.tutorial_form_container {
  display: flex;
  height: 100%;
  padding: 2rem;

  width: 80%;
  margin: -2rem auto;
  gap: 1rem;
  justify-content: center;
}

.tutorial_form_container_text {
  display: grid;
}

.tutorial_textarea{
  width: 80%;
  margin: -2rem auto;
}
</style>
