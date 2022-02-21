<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      :title="`tutorial ${idParam}`"
      :onClick="setDoc"
      @close="this.$router.push('/')"
    >
      <template v-slot:body>
        <div >
          <image-details
            :image="item.image"
            :category="item.category"
            imageW="auto"
            imageH="10rem"
            className="image_details_wrapper_grid"
          >
            <template v-slot:title>{{ item.title }}</template>
            <template v-slot:content>{{ item.content }}</template>
          </image-details>
          <icon-base
            icon-name="icon"       
            class="back_icon"
            @click="backAll"
            width="1rem"
          >
          <icon-open/>
          </icon-base>
        </div>

      </template>
    </widget-modal>
  </transition>
  <form-crud
    :showModal="showModal"
    @close="close"
    :value="value"
    :isEdit="isEdit"
  />
</template>

<script>
import { mapState, useStore } from 'vuex'
import { useRoute } from "vue-router";

import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import formCrud from './form.vue'
import ImageDetails from '@/components/ImageDetails.vue'
import IconLine from '@/components/svg/IconLine.vue'
import IconTrash from '@/components/svg/IconTrash.vue'
import IconOpen from '@/components/svg/IconOpen.vue'

export default {
  data() {
    return {
      showModalPrimary: true,
      showModal: false,
      value: {},
      isEdit: false, 
    }
  },
  setup() {
    const route = useRoute()
    const idParam = route.params.id

    const store = useStore()
    store.dispatch('list/getItem', {typeList: 'tutorials', id: idParam})
    return { idParam }
  },
  computed: mapState({
    item: (state) => state.list.item
  }),
  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    ImageDetails,
    IconLine,
    IconTrash,
    IconOpen
},
  methods: {
    openModal() {
      this.showModal = true
    },
    edit(value) {
      this.isEdit = true
      this.setDoc(value)
    },
    setDoc(value) {
      this.value = value
      this.openModal()
    },
    deleteTutorial(id) {
      this.dispatch('list/deleteItemList', {typeList:'tutoriais', id})
    },
    close() {
      this.dispatch('list/getList', 'tutoriais')
      this.showModal = false
    },
    backAll() {
      this.$router.push('/tutoriais')
    },
    submit(event) {
      if (!event) return;

      if (event.target && event.target.value) {
        this.dispatch('list/searchItemList', {typeList:'tutoriais', value: event.target.value})
      } else if(event.target.value === '') {
        this.dispatch('list/getList', 'tutoriais')
      }
    }
  }
}
</script>

<style scoped>
ul {
  display: grid;
  width: 90%;
  list-style-type: none;
  position: relative;
  height: 100%;
  margin: auto;
}

li {
  position: relative;
  width: 95%;
  cursor: pointer;
}

.team_btn_edit {
  border: none;
  position: absolute;
  right: -1rem;
  width: 24%;
  height: 1rem;
  background: transparent;
  cursor: pointer;
  top: 1rem;
  z-index: 4;
}
.team_icon_edit {
  width: 24%;
  height: 1rem;
}

a {
  text-decoration: none;
}

.fild_container_icon {
  position: absolute;
  bottom: -5rem;
  left: 1rem;
}
.back_icon {
  position: absolute;
  left: 5rem;
  top: -1rem;
  transform: rotateY(180deg);
  cursor: pointer;
}
</style>
