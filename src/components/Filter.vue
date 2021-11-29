<template>
  <form action="#" @submit.prevent="sendForm">
    <slot />
    <div class="filter_button">
      <Send @click="sendForm" width="100%" :text="text"></Send>
    </div>
  </form>
</template>
<script>
import Send from '@/components/button/Send.vue'
import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'

export default {
  props: {
    filterData: { type: Object, required: true, default: false },
    text: { type: String, required: false, default: 'Enviar' }
  },
  methods: {
    sendForm() {
      this.$emit('submit')
    }
  },
  components: { Send, FildInput, FildDate }
}
</script>
<style scoped>
form {
  display: grid;
  align-content: center;
}
.filter_button {
  width: 6rem;
  margin: auto;
  margin-top: -5rem;
}
</style>
