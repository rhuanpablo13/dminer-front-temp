<template>
  <form action="#" @submit.prevent="send">
    <div class="feed_comment_input">
      <Avatar :avatar="avatar" width="1rem" height="1rem"></Avatar>

      <fild-input text="Comentar" v-model="value.content" :value="value.content" required />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import FildInput from '@/components/input/Fild.vue'

import useFeed from '@/composables/useFeed.js'
import { dateHourFormart, dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
       value: { 
        content: '',
        login: '', 
        date: ''
      }
    }
  }, 
  props: {
    avatar: { type: String, required: true }
  },
  setup() {
    const { crateComment } = useFeed()
    return { crateComment }
  },
  computed: mapState({
    getUser: (state) => state.user.login
  }),

  components: {
    Avatar,
    FildInput
  },
  methods: {
    send() {
      this.$store.dispatch('form/setLoading')
      this.value = {
        ...this.value,
        login: this.getUser,
        date: dateHourFormarUs( this.value.date)
      }
      let result =  this.crateComment(this.value)

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
