<template>
  <icon-base
    class="icon__feed"
    icon-name="icon"
    viewBox="0 0 250 500"
    width="100%"
    height="100%"
  >
    <icon-feed>
      <div class="feed__head">
        <h2>Feed</h2>
      </div>
      <div class="feed__content">
        <slot />
      </div>
      <div class="feed__footer">
        <!-- <icon-base classe="feed_footer_icon" :onClick="clickNew">
            <icon-feed-view></icon-feed-view>
          </icon-base> -->
        <icon-base classe="feed_footer_icon" :onClick="clickView">
          <icon-feed-new></icon-feed-new>
        </icon-base>
        <!-- <icon-base classe="feed_footer_icon" :onClick="clickView">
            <icon-feed-save></icon-feed-save>
          </icon-base> -->
      </div>
    </icon-feed>
  </icon-base>
  <transition name="fade" v-if="showModalView">
    <feed-view  ></feed-view>
  </transition>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import IconFeed from '@/components/svg/IconFeed.vue'
import IconFeedNew from '@/components/svg/IconFeedNew.vue'
import IconFeedSave from '@/components/svg/IconFeedSave.vue'
import IconFeedView from '@/components/svg/IconFeedView.vue'
import FeedView from '@/views/feed/feedView.vue'

export default {
  data() {
    return {
      showModalView: false
    }
  },
  components: {
    IconFeed,
    IconBase,
    IconFeedNew,
    IconFeedSave,
    IconFeedView,
    FeedView
  },
  methods: {
    clickNew() {
      console.log('new')
    },
    clickSave() {
      console.log('save')
    },
    clickView() {
      this.$router.push('/feed')
    }
  }
}
</script>

<style scoped>
.icon__feed {
  height: 105%;
  width: auto;
  position: absolute;
  top: -50px;
  right: -25px;
}

.feed__head {
  display: flex;
  justify-content: center;
  margin-left: 50%;
  text-transform: uppercase;
}
.feed__content {
  overflow-y: auto;
}

.feed__footer {
  position: absolute;
  bottom: 0.4rem;
  /* transform: translate(50%, -50%); */
  width: 100%;
}

.feed_footer_icon {
  cursor: pointer;
}

h2 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
}

@media only screen and (max-width: 1080px) {
  .icon__feed {
    width: 100%;
    position: initial;
  }
}
</style>
