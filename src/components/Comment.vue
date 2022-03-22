<template>
  <form action="#">
    <div class="feed_comment_input">
      <!-- <div class="container_header_comment_com"> 
        <Avatar :avatar="image" width="1rem" height="1rem"></Avatar> 
      </div> -->
      <fild-input text="Comentar" v-model="value.content" :value="value.content" required />
      <send
        @click="send"
        type="button"
        width="100%"
        text="Enviar"
      ></send>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from '@/components/Avatar.vue'
import FildInput from '@/components/input/Fild.vue'

import useFeed from '@/composables/useFeed.js'
import usePost from '@/composables/usePost.js'
import { dateHourFormarUs } from '@/util/date.js'
import Send from './button/Send.vue'

export default {
  data() {
    return {
       value: { 
        content: '',
        login: this.getUser, 
        date: dateHourFormarUs(new Date()),
        idPost: this.idPost
      }
    }
  }, 
  props: {
    avatar: { type: String, required: true },
    idPost: { type: String, required: true},
  },
  setup(props) {
    const { crateComment } = useFeed()
    const { setPost } = usePost()
    return { crateComment, setPost, image: props.avatar }
  },
  computed: mapState({
    getUser: (state) => state.user.login,
  }),

  components: {
    Avatar,
    FildInput,
    Send
},
  methods: {
    send(e) {
      e.preventDefault();
      this.value.login = this.getUser
      this.$store.dispatch('post/setComment', this.value).then(()=> {
        this.value.content = ''
      })
    }
  }
}
</script>

<style >
.feed_comment_input {
  display: flex;
  height: 4rem;
  gap: 0.5rem;
  /* width: 15rem; */
  font-size: 0.5rem;
  margin: auto;
  /* margin-top: -2rem; */
}

#container_input_Comentar{
  /* width: 13rem !important; */
  width: 20rem !important;
}

.container_header_comment_com {
  display: grid;
  font-size: 0.3rem;
  justify-content: center;
  justify-items: center;
}
</style>
