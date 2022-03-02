<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalFeed"
      title="feed"
      :onClick="openModal"
      @close="closeModalFeed"
      :overflow="false"
      search
      @change="submit"
      :noRegistry="!posts.length"
    >
      <template v-slot:body>
        <div class="feed_container">
          <div class="feed_all_container">
            <ul class="post_container" >
              <li
                class="feed_container_li"
                v-for="item in posts"
                :key="item.id"
              >
                <widget-layout-home
                  classContent="feed_all_widget"
                  layout="icon-folder-feed"
                  isExpanded
                  isFavorite
                  :favorite="hasUserIndex(item) ? 'icon-favorite-dsabled' : 'icon-favorite'"
                  :onClick="() => clickView(item.id)"
                  :id="item.id"
                  @favoriteAction="favoriteAction(item)"
                >
                  <post :value="item" />
                </widget-layout-home>
              </li>
            </ul>
          </div>

         <div>
          <filter-feed
            @submit="filter"
            class="feed_view_filter"
            text="Filtrar"
            favorite
          >
            <fild-date
              text="Filtrar por data"
              v-model="filterData.date"
              :value="filterData.date"
            />

            <fild-select
              text="Filtrar por pessoa"
              v-model="filterData.user"
              :value="filterData.user"
              :options="dropdownUser"
            />
          </filter-feed>
          </div>
        </div>
      </template>
    </widget-modal>
  </transition>
  <form-crud  v-if="showModal" :showModal="showModal" @close="close" :isEdit="isEdit" />
</template>

<script>
import { mapState, useStore } from 'vuex'

import WidgetModal from '@/components/widget/WidgetModal.vue'
import formCrud from './form.vue'

import FildSelect from '@/components/input/FildSelect.vue'
import FildDate from '@/components/input/FildDate.vue'
import Post from '@/components/Post.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FilterFeed from '@/components/Filter.vue'

export default {
  data() {
    return {
      showModalFeed: true,
      showModal: false,
      filterData: {
        date: new Date(),
        user: ''
      },
      isEdit: false
    }
  },
  setup() {
    const { dispatch } = useStore() 

    dispatch('post/getPostViewAll')

    return { dispatch }
  },

  components: {
    WidgetModal,
    formCrud,
    FildSelect,
    FildDate,
    Post,
    WidgetLayoutHome,
    FilterFeed
  },

  computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    posts: (state) => state.post.posts,
    login: (state) => state.user.login,
  }),

  methods: {
    openModal() {
      this.showModal = true
    },
    close() {
      dispatch('post/getPostViewAll')
      this.showModal = false
    },
    closeModalFeed() {
      this.showModalFeed = false
      this.$router.push('/')
    },
    clickView(id) {
      this.showModalFeed = false
      this.$router.push(`/post/${id}`)
    },
    filter() {
      if (this.filterData ) {
        this.dispatch('post/goSearchViewAll', this.filterData)
      }
    },
    favoriteAction(post) {
      const toggle = this.hasUserIndex(post)
      this.dispatch('post/setFavorite',  { idPost: post.id, toggle: toggle})
    },
    hasUserIndex(post) {
      return post.favorites.indexOf(this.login) === -1
    },
    submit(event) {
      if (!event) return;

      if (event.target && event.target.value) {
        this.dispatch('list/searchItemList', {typeList:'post', value: event.target.value})
      } else if(event.target.value === '') {
        this.dispatch('list/getList', 'post')
      }
    },
  }
}
</script>

<style>

.feed_all_container {
  overflow: hidden !important;
  width: 90%;
  margin-left: 1rem;
  margin-top: -2rem;
}

.post_container {
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 1rem;
  list-style-type: none;
  max-height: 358px;
}

.feed_all_widget {
  overflow: hidden !important;
  margin-top: -2rem !important;
  max-height: none;
}

.feed_container_li {
  margin-left: -1rem;
  height: 16rem;
}

.feed_container {
  height: 330px;
  /* width: 90%; */
  margin: auto;

  display: grid;
  grid-template-columns: 75% 20%;
  /* margin-left: 4rem; */
}

.feed_view_filter {
  font-size: 0.5rem;
  margin-right: -1rem;
}
</style>
