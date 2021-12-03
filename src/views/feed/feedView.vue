<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalFeed"
      title="feed"
      :onClick="openModal"
      @close="closeModalFeed"
      :overflow="false"
    >
      <template v-slot:body>
        <div class="feed_container">
          <div v-if="viewAll">
          <post :value="value"  />
          </div>
          <div class="feed_all_container" v-else>
            <ul class="post_container">
              <li
                class="feed_container_li"
                v-for="post in value"
                :key="post.id"
              >
                <widget-layout-home
                  classContent="feed_all_widget"
                  layout="icon-folder-feed"
                  isExpanded
                  :onClick="() => clickView(value.idPost)"
                >
                  <post :value="value" />
                </widget-layout-home>
              </li>
            </ul>
          </div>

      <div>
          <filter-feed
            @submit="filter"
            :isLoading="isLoading"
            :isSuccess="isSuccess"
            :isError="isError"
            class="feed_view_filter"
            text="Filtrar"
          >
            <fild-date
              text="Filtrar por data"
              v-model="filterData.date"
              :value="filterData.date"
            />

            <fild-input
              text="Filtrar por pessoa"
              v-model="filterData.user"
              :value="filterData.user"
            />
          </filter-feed>
          </div>
        </div>
      </template>
    </widget-modal>
  </transition>
  <form-crud :showModal="showModal" @close="close" :isEdit="isEdit" />
</template>

<script>
import WidgetModal from '@/components/widget/WidgetModal.vue'
import formCrud from './form.vue'

import FildInput from '@/components/input/Fild.vue'
import FildDate from '@/components/input/FildDate.vue'
import Post from '@/components/Post.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FilterFeed from '@/components/Filter.vue'

export default {
  data() {
    return {
      showModalFeed: true,
      showModal: false,
      viewAll: this.$route.params.id,
      comment: '',
      isLoading: false,
      isSuccess: false,
      isError: false,
      filterData: {
        date: new Date(),
        user: ''
      },
      value: {
        comments: [
          {
            content: '',
            date: '',
            user: {
              login: 'teste',
              avatar: ''
            },
          }
        ],
        arquivos: '',
        date: '',
        title: '',
        content:'',
        user: {
          login: '',
          avatar: ''
        }
      },
      isEdit: false
    }
  },
  setup() {},
  components: {
    WidgetModal,
    formCrud,
    FildInput,
    FildDate,
    Post,
    WidgetLayoutHome,
    FilterFeed
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    edit(value) {
      this.isEdit = true
      this.setDoc(value)
    },

    close() {
      this.showModal = false
    },
    closeModalFeed() {
      this.showModalFeed = false
      this.$router.push('/')
    },
    clickView(id) {
      this.$emit('close')
      this.$router.push(`/feed/${id}`)
    },
    filter() {
      console.log(this.filterData)
    }
  }
}
</script>

<style>

.feed_all_container {
  overflow-y: auto;
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

.feed_container {
  height: 365px;
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
