<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      title="permissão"
      @close="this.$router.push('/')"
      :noRegistry="!list.length"
      :overflow="false"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in list" :key="key">
            <div class="permission_label">
              <label>{{ item.userName }}</label>
            </div>
            <div class="permition_select">
              <fild-select :options="dropdownPermission" text="permitir" @change="change($event, item.login)"/>
            </div>

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
</template>

<script>
import { mapState, useStore } from 'vuex'

import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import formCrud from './form.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import IconLine from '@/components/svg/IconLine.vue'

export default {
  setup() {
    const { dispatch } = useStore()
    dispatch('list/getListUser', { avatar: false})
    dispatch('dropdown/getDropdownPermission')
    
    return {
      showModalPrimary: true,
      showModal: false,
      value: {},
      isEdit: false
    }
  },
  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    FildSelect,
    IconLine
  },
  computed: mapState({
    list: (state) => state.list.user || [],
    dropdownPermission: (state) => state.dropdown.permissions
  }),
  methods: {
    openModal() {
      this.showModal = true
    },
    setDoc(value) {
      this.isEdit = true
      this.value = value
      this.openModal()
    }, 
    change(value, login) {
      this.$store.dispatch(
        'list/updateItemList', 
        {typeList: 'user/permission', 
        value: {login , permission: value.name}}
      )
    }
  }
}
</script>

<style scoped>

ul {
  list-style-type: none;
  position: relative;

  display: grid;
  justify-items: center;
  overflow-y: auto;

  max-height: 320px;
  width: 90%;
}

li {
  width: 90%;
  display: flex;
  align-items: start;
  position: relative;
  height: 7rem;
}

.permission_label {
  display: grid;
  align-content: center;
  height: 4rem;
}

label {
  text-transform: uppercase;
  margin-left: 2rem;
  font-size: 0.7rem;
}

.permition_select {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
  z-index: 9999999999999999999;

  cursor: pointer;
}

.vue-select-header > .vue-input > input {
  cursor: pointer;
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

a {
  text-decoration: none;
}

.fild_container_icon {
  /* position: absolute;
  bottom: 0;
  left: 0;
  /* width: fit-content;

  grid-area: icon;
  transform: rotateY(180deg); */

  transform: rotateY(180deg);
  margin-top: -30px;
  z-index: 3;
  position: absolute;
  bottom: -20px;
}
</style>
