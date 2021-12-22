<template>
  <div class="feed_header">
    <Avatar :avatar="avatar" width="4rem" height="4rem"></Avatar>
    <div class="feed_header_text">
      <Title>{{ username }}</Title>
      <h3>{{ text }}</h3>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Title from '@/components/title/Title.vue'

export default {
  props: {
    avatar: { type: String, required: true },
    username: { type: String, required: false, default: '' },
    text: { type: String, required: false, default: '' }
  },
  components: {
    Avatar,
    Title
  }
}
</script>

<style scoped>
.feed_header {
  display: flex;
  gap: 1.5rem;
  position: absolute;
  top: -0.5rem;
  left: 6rem;
}

.feed_header_text {
  /* line-height: 0.2rem; */
  text-align: start;
  color: var(--sidebar-green-ligth);
  margin-top: -1rem;
}


h3 {
  margin-top: -2rem;
}
</style>
