<template>
  <header-post
    :avatar="value.user.avatar"
    :username="value.user.userName"
    :text="value.title"
  />

  <div class="feed_contant">
    <div class="feed_container_text"  v-if="value.content">{{ value.content }}</div>
    <div
      v-if="!!value.anexo"
      class="feed_container_imagem"
      :style="{ 'background-image': `url(${value.anexo})` }"
    >
    </div>
      <ul class="feed_container_likes">
        <li v-for="(react_value, key) in value.reacts" :key="key" @click="like(key)">
          <React :layout="key" :reacts="react_value.length" :disabled="disabledReact && reactActive !== key" :reactActive="reactActive"/>
        </li>
      </ul>
      <icon-base
        viewBox="0 0 500 58"
        width="80%"
        height="100%"
        class="fild_container_icon"
      >
        <icon-line-mult />
      </icon-base>

    <div class="feed_container_comments">
      <ul v-if="value.comments.length">
        <li v-for="comment in value.comments" :key="comment.id">
          <comment-post :avatar="comment.user.avatar" :text="comment.content" />
        </li>
      </ul>
      <div class="comment_input">
       <comment :avatar="value.user.avatar" :idPost="value.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, useStore } from 'vuex'

import HeaderPost from '@/components/HeaderPost.vue'
import CommentPost from '@/components/CommentPost.vue'
import FildDate from '@/components/input/FildDate.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconLineMult from '@/components/svg/IconLineMult.vue'
import Comment from '@/components/Comment.vue'
import Title from '@/components/title/Title.vue'
import React from './React.vue'

export default {
  props: {
    value: { type: Object, required: true }
  },
  setup(props) {
    const store = useStore()

    let disabledReact = false
    let reactActive = ''
    Object.keys(props.value.reacts).map(key => {
      const index = props.value.reacts[key].indexOf(store.state.user.login)
      if (index !== -1) {
        disabledReact = true
        reactActive = key
      }
    })

    return {
      disabledReact,
      reactActive,
    }
  },
  components: {
    HeaderPost,
    CommentPost,
    FildDate,
    IconBase,
    IconLineMult,
    Comment,
    Title,
    React
  }, 
  computed: mapState({
    login: (state) => state.user.login,
  }),

  methods: {
    hasUserIndex(reacts) {
      return this.value.reacts[reacts].indexOf(this.login) 
    },
    like(reacts) {
      const index = this.hasUserIndex(reacts)
      if (index === -1) {
        this.value.reacts[reacts].push(this.login)
        this.disabledReact = true
        this.reactActive = reacts
      }else {
        this.value.reacts[reacts].splice(index, 1)
        this.disabledReact = false
        this.reactActive = ''
      }
      this.$store.dispatch('post/setLike', {id: this.value.id, login: this.login, reacts: reacts, toggle: this.disabledReact })
    }
  }
}
</script>

<style scoped>
.feed_contant {
  padding: 1rem 2rem;
  margin: auto;
  overflow: auto;
  max-height: 85%;
}

/* .feed_container_imagem {
  height: 8rem;
  width: 15rem;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0.5rem auto;
  position: relative;
} */

.feed_container_imagem {
  height: 10rem;
  width: 20rem;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0.5rem auto;
  position: relative;
}


/* .feed_container_text {
  word-break: break-word;
  text-overflow: ellipsis;
  text-align: start;
  width: 15rem;
  font-size: 0.6rem;
  margin: auto;
} */

.feed_container_text {
  word-break: break-word;
  text-overflow: ellipsis;
  text-align: start;
  width: 20rem;
  /* font-size: 1rem; */
  margin:  1rem auto;

}


.fild_container_icon {
  /* margin-top: 6rem; */
  margin-top: 1rem;
}

.feed_container_comments {
    /* margin-top: 3rem; */
}

.feed_container_likes {
  display: flex;
  /* height: 10rem; */
  font-size: 0.3rem;
  justify-content: center;
  align-content: flex-start;
  gap: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  width: 23rem;
  overflow: hidden;
}

.comment_input {
  width: 18rem;
  margin: auto;
  margin-top: 1rem;
}

ul {
  width: 18rem;
  max-height: 10rem;
  list-style-type: none;

  margin: auto;
  margin-top: -1rem;
  overflow-y: auto;
}

li {
  margin-left: -1.5rem;
  /* height: 2rem; */
  margin-top: -1rem;
}
</style>
