<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de documentos"
    @submit="sendForm(e)"
  >
    <div class="form_container">
      <div class="form_container_text">
        <fild-input
          :text="'Título'"
          v-model="value.title"
          :value="value.title"
          required
        />
        <fild-input
          :text="'Link'"
          v-model="value.contentLink"
          :value="value.contentLink"
          required
        />
        <fild-select
          :text="'Permissão'"
          v-model="value.permission"
          :value="value.permission"
          required
          :options="dropdownPermission"
        />

        <fild-select
          :text="'Categoria'"
          v-model="value.category"
          :value="value.category"
          required
          :options="getCategories"
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

import useDocument from '@/composables/useDocument'
import useCategory from '@/composables/useCategory'

export default {
  components: { FildInput, FormModal, FildSelect },
  props: {
    showModal: { type: Boolean, required: true },
    isEdit: false,
    value: {
      type: Object,
      required: false,
      default: {
        title: '',
        category: 0,
        permissions: 0,
        contentLink: ''
      }
    }
  },
  setup() {
    const { create, update } = useDocument()
    const { getCategories } = useCategory()

    return { create, getCategories, update }
  },
  computed: mapState({
    dropdownPermission: (state) => state.dropdown.permissions,
  }),

  methods: {
    sendForm(e) {
      debugger
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
