<template>
  <form action="#" @submit.prevent="send">
    <div class="feed_comment_input">
      <Avatar :avatar="avatar" width="1rem" height="1rem"></Avatar>

      <fild-input text="Comentar" v-model="value" :value="value" required />
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import Avatar from '@/components/Avatar.vue'
import FildInput from '@/components/input/Fild.vue'

import useFeed from '@/composables/useFeed.js'

export default {
  props: {
    avatar: { type: String, required: true }
  },
  setup() {
    const value = ref(null)
    const { crateComment } = useFeed()
    return { value, crateComment }
  },
  components: {
    Avatar,
    FildInput
  },
  methods: {
    send() {
      this.$store.dispatch('form/setLoading')
      let result = this.isEdit
        ? this.update(this.value)
        : this.create(this.value)

      this.$store.dispatch('form/setLoading')
      if (result) {
        this.$store.dispatch('form/setSuccess').then(() => {
          this.$emit('close')
        })
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    }
  }
}
</script>

<style scoped>
.feed_comment_input {
  display: flex;
  height: 4rem;
  gap: 1rem;
  width: 15rem;
  font-size: 0.5rem;
  margin: auto;
  margin-top: -2rem;
}
</style>
