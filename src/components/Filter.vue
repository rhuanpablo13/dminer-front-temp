<template>
  <form
    action="#"
    @submit.prevent="sendForm"
    :class="{ form_filter: !isLogin, form_login: isLogin }"
  >
    <slot />
    <div class="filter_button">
      <Send
        @click="sendForm"
        width="100%"
        :text="text"
        :class="{ login_button: isLogin, filter_button: !isLogin }"
      ></Send>
      <Favorite
       class="favorite"
        text="Favorito"
        v-if="favorite"
      ></Favorite>
    </div>
  </form>
</template>
<script>
import Send from '@/components/button/Send.vue'
import Favorite from '@/components/button/Favorite.vue'
import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'

export default {
  props: {
    filterData: { type: Object, required: true, default: false },
    favorite: { type: Boolean, required: false, default: false },
    text: { type: String, required: false, default: 'Enviar' },
    isLogin: { type: Boolean, required: false, default: false }
  },
  methods: {
    sendForm() {
      this.$emit('submit')
    }
  },
  components: { Send, FildInput, FildDate, Favorite }
}
</script>
<style scoped>
.form_filter {
}

.form_login {
  display: grid;
  align-content: center;
}
.login_button {
  width: 6rem;
  margin: auto;
  margin-top: -7rem;
}

.filter_button {
  width: 8rem;
  margin: auto;
  margin-top: 0;
  display: grid;
  justify-content: center;
  gap: 0.5rem;
  height: 10rem;
  z-index: 1;
}

.favorite {
  margin-top: -3rem;
  z-index: 2;
}
</style>
