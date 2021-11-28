<template>
  <div class="feed_comment_input">
    <Avatar :avatar="avatar" width="1rem" height="1rem"></Avatar>

    <fild-input text="Comentar" ref="comment" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Avatar from '@/components/Avatar.vue'
import FildInput from '@/components/input/Fild.vue'

export default {
  props: {
    avatar: { type: String, required: true }
  },
  setup() {
    const comment = ref(null)
    return { comment }
  },
  components: {
    Avatar,
    FildInput
  },
  methods: {
    send() {
      console.log(this.comment)
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
