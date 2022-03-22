<template>
  <div class="feed_comments">
  <div class="container_header_comment"> 
      <Avatar  :avatar="image" width="1rem" height="1rem"></Avatar>
      <span> {{ username }} </span>
  </div>

    <div class="feed_comments_text">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import Title from '@/components/title/Title.vue'

export default {
  data() {
    return { image: ""}
  },
  props: {
    avatar: { type: String, required: true },
    username: { type: String, required: true},
    text: { type: String, required: false, default: '' },
    isLoading: { type: Boolean, require: true, default: false}
  },
  mounted() {
    this.image = this.avatar
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

.container_header_comment{
  display: grid;
  font-size: 0.3rem;
  justify-content: center;
  justify-items: center;
}
</style>
