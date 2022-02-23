<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de documentos"
    @submit="sendForm()"
  >
    <div class="form_container">
      <div class="form_container_text">
        <fild-input
          text="Título"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-input
          text="Link"
          v-model="value.contentLink"
          :value="value.contentLink"
          required
        />
        <fild-select
          text="Categoria"
          v-model="value.category"
          :value="value.category"
          required
          :options="dropdownCategory"
        />
        <fild-checkbox
          text="Documento Interno"
          v-model="value.permission"
          :value="value.permission"
          type="checkbox"
        />
      </div>
    </div>
  </form-modal>
</template>
<script>
import { mapState, useStore } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'

export default {
  setup() {
    const store = useStore()
    // store.dispatch('dropdown/getDropdownPermission')
    // store.dispatch('dropdown/getDropdownCategory')

    return { dispatch: store.dispatch }
  },
  components: { FildInput, FormModal, FildSelect, FildCheckbox },
  props: {
    showModal: { type: Boolean, required: true },
    isEdit: false,
    value: {
      type: Object,
      required: false,
      default: {
        title: '',
        category: 0,
        permission: false,
        contentLink: ''
      }
    }
  },
  computed: mapState({
    dropdownPermission: (state) => state.dropdown.permissions,
    dropdownCategory: (state) => state.dropdown.category,
  }),

  methods: {
    sendForm() {
      if (this.validForm()) {
        this.dispatch(
          this.isEdit ? 'list/updateItemList' : 'list/createItemList', 
          {typeList: 'document', 
          value: this.value}
        )
        this.$emit('close')
      } else {
        this.dispatch('form/setLoading')
        this.dispatch('form/setError')
      }
    },
    validForm() {
      return  this.value.hasOwnProperty('title') && this.value?.title !== "" && 
              this.value.hasOwnProperty('category') && this.value?.category !== 0 &&
              this.value.hasOwnProperty('permission') && this.value?.permission !== 0 && 
              this.value.hasOwnProperty('contentLink') && this.value?.contentLink !== "" 
    }
  }
}
</script>

<style scope>
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
