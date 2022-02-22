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

        <loading v-if="isLoading && !list.length"/>
        <no-registry v-if="!isLoading && !list.length" style="text-align: revert; margin: auto; font-size: 0.6rem;"/>
        <div  v-if="!isLoading && list.length">
          <publication
            v-for="(post, key) in list.length"
            :key="key"
            :content="post.content"
            :title="post.title"
            :onClick="() => openFeedView(post.idPost)"
          />
        </div>
      </feed>
    </div>
  </div>
</template>

<script>
import { mapState, useStore } from 'vuex'

import Feed from '@/components/Feed.vue'
import Publication from '@/components/Publication.vue'
import useFeed from '@/composables/useFeed.js'
import Loading from '@/components/Loading.vue'
import NoRegistry from '@/components/NoRegistry.vue'

export default {
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
  components: { 
    Feed, 
    Publication,
    Loading,
    NoRegistry 
  },
  computed: mapState({
    sidebarWidth: (state) => state.sidebar.sidebarWidth,
    list: (state) => state.home.feedList,
    isLoading: (state) => state.list.isLoading,
  }),
  methods: {
    openFeedView(id) {
      this.$router.push(`/post/${id}`)
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
  /* margin: inherit; */
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
    /* margin: inherit; */
    margin-top: -6rem;
  }
}
</style>
