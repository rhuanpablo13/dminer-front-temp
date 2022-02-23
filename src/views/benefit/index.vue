<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      title="benefícios"
      :onClick="setDoc"
      @close="this.$router.push('/')"
      :search="list.length"
      @change="submit"
      :noRegistry="!list.length"
    >
      <template v-slot:body>
        <ul v-if="list.length">
          <li v-for="(item, key) in list" :key="key">
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
                @click="deleteBenefit(item.id)"
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
              class="fild_container_icon_benefit"
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

export default {
  data() {
    return {
      typeList: 'benefits',
      showModalPrimary: true,
      showModal: false,
      value: {},
      isEdit: false,
    }
  },
  setup() {
    const store = useStore()
    store.dispatch('list/getList', 'benefits')

    return {
      dispatch: store.dispatch
    }
  },
  computed: mapState({
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
    list: (state) => state.list.benefits || []
  }),

  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    ImageDetails,
    IconLine,
    IconTrash,
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    async edit(value) {
      this.isEdit = true
      this.value =  value 
      this.setDoc(this.value)
    },
    deleteBenefit(id) {
      this.dispatch('list/deleteItemList', {typeList: this.typeList, id})
    },
    setDoc(value) {
      this.value = value
      this.openModal()
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
    },
  }
}
</script>

<style scoped>
ul {
  display: grid;
  width: 90%;
  list-style-type: none;
  position: relative;
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

.fild_container_icon_benefit {
  position: absolute;
  bottom: -4rem;
  left: 1rem;
}
</style>
