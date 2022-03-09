<template>
  <form-modal
    :showModal="showModal"
    title="cadastro de perfil"
    @submit="sendForm"
  >
   <template v-slot:body>
    <div class="benefit_form_container">
      <div class="benefit_form_container_text">
          <fild-input
            text="Permissão"
            v-model="value.title"
            :value="value.title"
            required
          />
      </div>
    </div>
   </template>
  </form-modal>
</template>

<script>
import FildInput from '@/components/input/Fild.vue'
import IconBase from '@/components/svg/IconBase.vue'
import Send from '@/components/button/Send.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'

export default {
  components: { FildInput, IconBase, Send, WidgetModal },
  props: {
    showModal: { type: Boolean, required: true },
    isEdit: false,
    value: {
      type: Object,
      required: false,
      default: {
        title: ''
      }
    }
  },
  methods: {
    sendForm() {
      if (this.validForm()) {
        this.$store.dispatch(
          this.isEdit ? 'list/updateItemList' : 'list/createItemList', 
          {typeList: 'permission', 
          value: this.value}
        )
        this.$emit('close')
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
.permission_form_container {
  /* display: grid;
  background-image: url(/src/assets/widget/frame-team.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  margin: auto;
  justify-items: stretch;
  padding: 2rem; */

  width: 80%;
  margin: auto;
}

.permission_form_container_text {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 10%;
}
</style>
