<template>
  <div class="feed_header">
    <Avatar :avatar="image" width="4rem" height="4rem"></Avatar>
    <div class="feed_header_text">
      <h1>{{ username }}</h1>
      <h3>{{ text }}</h3>
      <h4>{{ dateHourFormart(datahora) }}</h4>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import { dateHourFormart } from '@/util/date'

export default {
  data() {
    return { image:'' }
  },
  props: {
    avatar: { type: String, required: true },
    username: { type: String, required: false, default: '' },
    datahora: { type: String, required: false, default: '' },
    text: { type: String, required: false, default: '' }
  },
  components: {
    Avatar,
  },
  mounted() {
    this.image = this.avatar
  },
  setup() {
    return { dateHourFormart}
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
  word-break: break-word;
  width: 77%;
}

h1 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 14rem;
}

h4{
  margin-top: -1rem;
}
</style>
