<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      title="tutorial"
      :onClick="permissionADM ? () => setDoc() : null"
      @close="this.$router.push('/')"
      search
      @change="submit"
      :noRegistry="!list.length"
      :typeList="typeList"
    >
      <template v-slot:body>
        <ul v-if="list.length">
          <li v-for="(item, key) in list" :key="key" >
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
              @click="setItem(item)"
              :image="item.image"
              :category="item.category"
              imageW="9rem"
              imageH="9rem"
              className="image_details_wrapper"
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
import { mapState, useStore } from 'vuex'

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
      isAll: true,
      doc: {}
    }
  },
  setup() {
    const  typeList =  'tutorials'
    const store = useStore()
    store.dispatch('list/getList', typeList)

    return {
      dispatch: store.dispatch,
      typeList
    }
  },
  computed: mapState({
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
    list: (state) => state.list.tutorials || []
  }),
  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    ImageDetails,
    IconLine,
    IconTrash,
    IconOpen,
},
  methods: {
    openModal() {
      this.showModal = true
    },
    edit(value) {
      this.dispatch('list/setNoRegistry', false)
      this.isEdit = true
      this.setDoc(value)
    },
    setDoc(value) {
      this.dispatch('list/setNoRegistry', false)

      this.value = value
      this.openModal()
    },
    setItem(item){
      this.$router.push(`/tutoriais/${item.id}`)
    },
    deleteTutorial(id) {
      this.dispatch('list/deleteItemList', {typeList:this.typeList, id})
    },
    close() {
      this.dispatch('list/getList', this.typeList)
      this.showModal = false
    },
    submit(event) {
      if (!event) return;

      if (event.target && event.target.value) {
        this.dispatch('list/searchItemList', {typeList:this.typeList, value: event.target.value})
      } else if(event.target.value === '') {
        this.dispatch('list/getList', this.typeList)
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
