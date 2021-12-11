<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      title="tutorial"
      :onClick="setDoc"
      @close="this.$router.push('/')"
      search
      @submit="submit"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in getTutorials" :key="key">
            <button class="team_btn_edit" v-if="permissionADM">
              <icon-base
                icon-name="icon"
                class="team_icon_edit"
                @click="edit(item)"
              >
                <icon-edit />
              </icon-base>
              <icon-base
                icon-name="icon"
                class="team_icon_edit"
                @click="deleteTutorial(item.id)"
              >
                <icon-trash />
              </icon-base>
            </button>
            <image-details
              :image="item.image"
              :category="item.category"
              imageW="6rem"
              imageH="6rem"
            >
              <template v-slot:title>{{ item.title }}</template>
              <template v-slot:content>{{ item.content }}</template>
            </image-details>
            <icon-base
              viewBox="0 0 500 58"
              width="100%"
              height="100%"
              class="fild_container_icon"
            >
              <icon-line />
            </icon-base>
          </li>
        </ul>
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
import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import formCrud from './form.vue'
import ImageDetails from '@/components/ImageDetails.vue'
import IconLine from '@/components/svg/IconLine.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import useTutorial from '@/composables/useTutorial'
import usePermission from '@/composables/usePermission'

export default {
  data() {
    return {
      showModalPrimary: true,
      showModal: false,
      value: {},
      isEdit: false
    }
  },
  setup() {
    const { getTutorials, setTutorial, deleteItem, search } = useTutorial()
    const { getPermission } = usePermission()

    return { getTutorials, getPermission, setTutorial, deleteItem, search }
  },
  computed: {
    permissionADM() {
      return this.$store.state.user.type === 'ADMINISTRADOR'
    }
  },
  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    ImageDetails,
    IconLine,
    IconTrash
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
      this.setTutorial()
      this.showModal = false
    },
    submit(value) {
      if (typeof value == "string" && value.length) {
        this.getTutorials = this.search(value)
      } else if(typeof value == "string" && !value.length) {
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
  bottom: -4.5rem;
  left: 1rem;
}
</style>
