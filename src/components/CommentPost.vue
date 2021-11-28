<template>
  <div class="feed_comments">
    <Avatar :avatar="avatar" width="1rem" height="1rem"></Avatar>
    <div class="feed_comments_text">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Title from '@/components/title/Title.vue'

export default {
  props: {
    avatar: { type: String, required: true },
    text: { type: String, required: false, default: '' }
  },
  components: {
    Avatar,
    Title
  }
}
</script>

<style scoped>
.feed_comments {
  display: flex;
  gap: 1rem;
  align-items: center;

  margin-top: 1.5rem;
}

.feed_comments_text {
  color: var(--color-text);
  font-size: 0.5rem;
  margin-top: -2rem;
}
</style>
