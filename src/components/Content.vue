<template>
  <div
    class="container__content"
    :style="{
      'margin-left': sidebarWidth
    }"
  >
    <resize-observer @notify="handleResize" :showTrigger="true" />

    <!-- Left content -->
    <div class="container__left"><router-view /></div>

    <!-- Right content -->
    <div class="container__right">
      <feed>
        <publication
          v-for="(post, key) in feedList"
          :key="key"
          :content="post.content"
          :onClick="() => openFeedView(post.id)"
        />
      </feed>
    </div>
  </div>
</template>

<script>
import Feed from '@/components/Feed.vue'
import Publication from '@/components/Publication.vue'
import useFeed from '@/composables/useFeed.js'

import { useStore } from 'vuex'

export default {
  components: { Feed, Publication },

  setup() {
    const store = useStore()
    const { getFeeds } = useFeed()

    const PostList = getFeeds

    return {
      PostList,
      handleResize({ width }) {
        if (width < 1080) {
          store.dispatch('sidebar/openSidebar')
        } else {
          store.dispatch('sidebar/closeSidebar')
        }
      }
    }
  },
  computed: {
    sidebarWidth() {
      return this.$store.state.sidebar.sidebarWidth
    },
    feedList() {
      return this.$store.state.home.feedList
    }
  },
  methods: {
    openFeedView(id) {
      this.$router.push(`/feed/${id}`)
    }
  }
}
</script>

<style scoped>
.container__content {
  display: flex;
  margin-top: 5rem;
  height: calc(100vh - 5rem);
  transition: all 0.3s ease 0s;
}

.container__left {
  flex: 1;
}

.container__right {
  width: 20%;
  position: relative;
}

@media only screen and (max-width: 1080px) {
  .container__content {
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .container__left {
    margin-bottom: 5rem;
  }

  .container__right {
    /* width: 100%; */
    width: auto;
    margin: inherit;
    margin-top: -6rem;
  }
}
</style>
