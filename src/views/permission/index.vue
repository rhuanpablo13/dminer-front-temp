<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalPrimary"
      title="permissão"
      :onClick="openModal"
      @close="this.$router.push('/')"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in getAllUsers" :key="key">
            <h4>{{ item.name }}</h4>
            <div class="permition_select">
              <fild-select :options="getPermission" text="permitir" />
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
  <form-crud
    :showModal="showModal"
    @close="showModal = false"
    :value="value"
    :isEdit="isEdit"
  />
</template>

<script>
import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import formCrud from './form.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import IconLine from '@/components/svg/IconLine.vue'

import usePermission from '@/composables/usePermission'
import useAllUsers from '@/composables/useAllUsers'

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
    const { getPermission } = usePermission()
    const { getAllUsers } = useAllUsers()

    return { getPermission, getAllUsers }
  },
  components: {
    WidgetModal,
    formCrud,
    IconEdit,
    IconBase,
    FildSelect,
    IconLine
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    setDoc(value) {
      this.isEdit = true
      this.value = value
      this.openModal()
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
  align-items: center;
  position: relative;
}

h4 {
  text-transform: uppercase;
  margin-left: 2rem;
}

.permition_select {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 2rem;
  z-index: 4;

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
