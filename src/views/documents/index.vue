<template>
  <transition name="modal"  v-if="showModalEquipe"> 
    <widget-modal
      title="d-guide"
      :onClick="permissionADM ? () => setDoc() : null"
      @close="this.$router.push('/')"
      search
      @change="submit"
      :noRegistry="!list.length"
      :typeList="typeList"
    >
      <template v-slot:body>
        <ul v-if="list.length">
          <li v-for="(item, key) in list" :key="key">
            <a href="#"   @click="appendTheFile(item.contentLink)">
              {{ item.title }}
            </a>
            <div class="image_details_categorie" v-if="item.category">
             {{  getCategory(item.category) }}
            </div>
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
              class="fild_container_icon_document"
            >
              <icon-line />
            </icon-base>
          </li>
        </ul>
      </template>
    </widget-modal>
  </transition>
  <form-crud
    v-if="showModal"
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
import formCrud from '@/views/documents/form.vue'
import IconLine from '@/components/svg/IconLine.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import { onToast } from '@/util/toast.js'
import * as translation from '@/util/pt_BR.json'

export default {
  data() {
    return { showModalEquipe: true, showModal: false, value: {}, isEdit: false, search: true}
  },
  setup() {
    const typeList =  'document'
    const store = useStore()
    store.dispatch('list/getList', typeList)
    store.dispatch('dropdown/getDropdownCategory')

    return {
      dispatch: store.dispatch,
      typeList
    }
  },

  created() {
    this.search = !this.list.length
  },

  computed: mapState({
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
    list: (state) => state.list.document || [],
    dropdownCategory: (state) => state.dropdown.category,
  }),

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
    getCategory(id) {
      return this.dropdownCategory.length && this.dropdownCategory.filter(_category => _category.id === id)[0]?.name
    },
    edit(value) {
      this.isEdit = true
      this.setDoc(value)
    },
    deleteDoc(id) {
      this.dispatch('list/deleteItemList', {typeList:this.typeList, id})
    },
    setDoc(value) {
      this.dispatch('list/setNoRegistry', false)
      this.value = value
      this.openModal()
    },
    close() {
      this.dispatch('list/getList', this.typeList)
      this.showModal = false
      this.isEdit = false
    },
    submit(event) {
      if (!event) return;

      if (event.target && event.target.value) {
        this.dispatch('list/searchItemList', {typeList:this.typeList, value: event.target.value})
      } else if(event.target.value === '') {
        this.dispatch('list/getList', this.typeList)
      }
    },
    appendTheFile (url) { 
      // try {
      //   url = new URL(url)     // se for uma imagem, adicionamos uma imagem     
      // } catch (error) {
      //   onToast(translation.MESSAGE['ERROR_URL_DOC'], 'danger')
      // }

      // if (url.pathname.match(/\.(jpe?g|png|svg|webp|gif)/)) {       
        //  let img = document.createElement('img')       
        //  img.src = url.toString()       
        //  document.getElementById('container').appendChild(img)     
        // window.open(url, '_blank')
      // } else {       // se não for uma imagem, usamos um iframe 
      try {
        var _url = url.split("/");
        var index = _url.length - 1

        var oReq = new XMLHttpRequest();
        oReq.onload = this.reqListener;
        oReq.open("get", _url[index], true);
        oReq.send();
        
      } catch (error) {
        onToast(translation.MESSAGE['ERROR_URL_DOC'], 'danger')
      }  
        // let iframe = document.createElement('iframe')       
        // iframe.src = url.toString()       
        // document.getElementById('container').appendChild(iframe)
      // }    
    },
    reqListener(e) {
      window.open(e.target.responseURL, '_blank')
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
  cursor: pointer;
   z-index: 3;
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
  top: -0.4rem;
  background: transparent;
  cursor: pointer;
}
.team_icon_edit {
  width: 24%;
  height: 1rem;
}

.fild_container_icon_document {
  position: absolute;
  left: -1rem;
  z-index: 2;
  bottom: -2rem;
}

.image_details_categorie {
  background: #aaff48;
  padding: 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.4rem;
  height: 0.5rem;
  margin-left: auto;

  text-transform: uppercase;
}
</style>
