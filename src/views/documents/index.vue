<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalEquipe"
      title="d-guide"
      :onClick="setDoc"
      @close="this.$router.push('/')"
      search
      @submit="submit"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in getDocuments" :key="key">
            <a :href="item.content" target="_blank">
              {{ item.title }}
            </a>
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
                @click="deleteDoc(item.id)"
              >
                <icon-trash />
              </icon-base>
            </button>
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
import formCrud from '@/views/documents/form.vue'
import IconLine from '@/components/svg/IconLine.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import useDocument from '@/composables/useDocument'

export default {
  data() {
    return { showModalEquipe: true, showModal: false, value: {}, isEdit: false }
  },
  setup() {
    const { getDocuments, setDocument, deleteItem, search } = useDocument()

    return { getDocuments, setDocument, deleteItem, search }
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
    IconLine,
    IconTrash,
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    edit(value) {
      this.isEdit = true
      this.setDoc(value)
    },
    deleteDoc(id) {
      this.deleteItem(id)
      setTimeout(() => {
        this.setDocument()
      }, 300)
    },
    setDoc(value) {
      this.value = value
      this.openModal()
    },
    close() {
      this.setDocument()
      this.showModal = false
    },
    submit(value) {
      if (typeof value == "string" && value.length) {
        this.search(value)
      } else if(typeof value == "string" && !value.length) {
        this.setDocument()
      }
    }
  }
}
</script>

<style scoped>
ul {
  display: grid;
  width: 80%;
  list-style-type: none;
  position: relative;
  height: 100%;
  margin: auto;
}
li {
  padding: 1.5rem;
  display: flex;
  position: relative;
  margin-top: 1rem;
}

a {
  text-decoration: none;
  color: var(--color-title);
}
.icon_green {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--sidebar-green-ligth);
}

.team_btn_edit {
  border: none;
  position: absolute;
  right: -1rem;
  width: 24%;
  height: 1rem;
  top: 0.6rem;
  background: transparent;
  cursor: pointer;
}
.team_icon_edit {
  width: 24%;
  height: 1rem;
}

.fild_container_icon {
  position: absolute;
  left: -1rem;
}
</style>
