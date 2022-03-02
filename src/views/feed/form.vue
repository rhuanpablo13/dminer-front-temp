<template>
  <form-modal :showModal="showModal" title="post" @submit="sendForm">
    <div class="tutorial_form_container">
      <upload-image v-model="value.anexo" :propsImage="value.anexo" />
      <div class="tutorial_form_container_text">
        <fild-input
          text="Tópico"
          v-model="value.title"
          :value="value.title"
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
    <div class="tutorial_textarea">
      <fild-textarea
        text="Conteúdo"
        v-model="value.content"
        :value="value.content"
        required
      />
    </div>
  </form-modal>
</template>

<script>
import { mapState, useStore } from 'vuex'
import { reactive } from 'vue'

import FormModal from '@/components/FormModal.vue'
import FildInput from '@/components/input/Fild.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import UploadImage from '@/components/UploadImage.vue'
import FildTextarea from '@/components/input/FildTextarea.vue'

import { dateHourFormarUs } from '@/util/date'

// https://codesandbox.io/s/e7mok 
export default {
  components: {
    FildInput,
    FormModal,
    FildSelect,
    UploadImage,
    FildTextarea
  },
  props: {
    showModal: { type: Boolean, required: true, default: false },
    isEdit: false
  },
  setup() {
    const store = useStore()
    store.dispatch('list/setNoRegistry', false)

    const typeList = [
      { id: 1, name: 'Interno' },
      { id: 2, name: 'Externo' }
    ]

    const value = reactive({
      title: '',
      content: '',
      // permissions: 0,
      anexo: null,
      type: typeList[0].id
    })

    return { typeList, value , dispatch: store.dispatch}
  },
  computed: mapState({
    getUser: (state) => state.user.login
  }),

  methods: {
    sendForm() {
      if (this.validForm()) {
       this.dispatch(
          this.isEdit ? 'list/updateItemList' : 'list/createItemList', 
          {
            typeList: 'post', 
            value: this.value
          }
        )  
        
        const data = { keyword: null, login: this.getUser }
        this.$store.dispatch('home/search', data)
        this.$emit('close')
      } else {
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.date = dateHourFormarUs(new Date())
      this.value.login = this.getUser

      return this.value.hasOwnProperty('content') && this.value?.content !== "" &&
             this.value.hasOwnProperty('title') && this.value?.title &&
             this.value.hasOwnProperty('type') && this.value?.type
    }
  }
}
</script>

<style scope>
/* .benefit_form_container {
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
} */

.tutorial_form_container {
  display: flex;
  height: 100%;
  margin: auto;
  padding: 1rem;

  width: 80%;
  margin: auto;
  gap: 1rem;
  justify-content: center;
}

.tutorial_form_container_text {
  display: grid;
}

.tutorial_textarea{
  width: 80%;
  margin:  auto;
}
</style>
