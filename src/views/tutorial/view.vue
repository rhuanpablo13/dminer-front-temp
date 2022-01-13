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
            :image="getTutorials.image"
            :category="getTutorials.category"
            imageW="auto"
            imageH="10rem"
            className="image_details_wrapper_grid"
          >
            <template v-slot:title>{{ getTutorials.title }}</template>
            <template v-slot:content>{{ getTutorials.content }}</template>
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
import { mapState } from 'vuex'
import { useRoute } from "vue-router";

import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import formCrud from './form.vue'
import ImageDetails from '@/components/ImageDetails.vue'
import IconLine from '@/components/svg/IconLine.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import useTutorial from '@/composables/useTutorial'
import usePermission from '@/composables/usePermission'
import useCategory from '@/composables/useCategory'
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

    const { setTutorial, deleteItem, getId, getTutorials } = useTutorial()
    const { getPermission } = usePermission()

    getId(idParam)

    return { getTutorials, getPermission, setTutorial, deleteItem, idParam, route }
  },
  computed: mapState({
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR'
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
      this.deleteItem(id)
      setTimeout(() => {
        this.setTutorial()
      }, 300)
    },
    close() {
      setTimeout(() => {
        this.setTutorial()
      }, 300)
      this.showModal = false
    },
    backAll() {
      this.$router.push('/tutoriais')
    },
    submit(event) {
      if (event.target && event.target.value) {
        this.search(event.target.value)
      } else if(event.target.value === '') {
        this.setTutorial()
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
