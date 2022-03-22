<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPost"
      title="feed"
      :onClick="openModal"
      @close="closeModalFeed"
      :overflow="false"
      :noRegistry="!post"
    >
      <template v-slot:body>
        <icon-base
            icon-name="icon"       
            class="back_icon"
            @click="backAll"
            width="1rem"
          >
          <icon-open/>
        </icon-base>
        <div class="feed_container_view">
          <div class="feed_all_container">
            <post :value="post"  v-if="post.user" />
          </div>
        </div>
      </template>
    </widget-modal>
  </transition>
  <form-crud :showModal="showModal" @close="close" :isEdit="isEdit" />
</template>

<script>
import { mapState, useStore } from 'vuex'

import WidgetModal from '@/components/widget/WidgetModal.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import FildDate from '@/components/input/FildDate.vue'
import Post from '@/components/Post.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FilterFeed from '@/components/Filter.vue'
import formCrud from './form.vue'
import IconOpen from '@/components/svg/IconOpen.vue'
import IconBase from '@/components/svg/IconBase.vue'

import { useRoute } from "vue-router";

export default {
  data() {
    return {
      showModalPost: true,
      showModal: false,
      filterData: {
        date: '',
        user: '',
        id: this.idParam
      },
      isEdit: false, 
    }
  },
  setup() {
    const route = useRoute()
    const idParam = route.params.id
    const { dispatch } = useStore() 

    dispatch('post/getPostView', idParam)

    return { idParam, dispatch }
  },

  computed: mapState({
    dropdownUser: (state) => state.dropdown.user,
    post: (state) => state.post.post,
    login: (state) => state.user.login
  }),

  components: {
    WidgetModal,
    FildSelect,
    FildDate,
    Post,
    WidgetLayoutHome,
    FilterFeed,
    formCrud,
    IconOpen,
    IconBase
  },
  methods: {
    backAll() {
      this.$router.push('/feed')
    },
    openModal() {
      this.showModal = true
    },
    close() {
      this.showModal = false
    },
    closeModalFeed() {
      this.showModalPost = false
      this.$router.push('/')
    },
    clickView(id) {
      this.$emit('close')
      this.$router.push(`/feed/${id}`)
    },
    filter() {
      if (this.validForm()) {
        this.dispatch('post/goSearchView', this.filterData)
      } else {
        this.dispatch('form/setError')
      }
    },
    validForm() {
      return this.filterData.date !== "" || this.filterData.user !== ""
    }
  }
}
</script>

<style>

.feed_all_container {
  overflow: hidden;
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
  overflow-y: auto;
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

.feed_container_view {
  height: 365px;
  /* width: 90%; */
  margin: auto;

  display: grid;
  /* grid-template-columns: 75% 20%; */ 
  /* margin-left: 4rem; */
}

.feed_view_filter {
  font-size: 0.5rem;
  margin-right: -1rem;
}

.back_icon {
  position: absolute;
  left: 4rem;
  top: -1.5rem;
  transform: rotateY(180deg);
  cursor: pointer;
}
</style>
