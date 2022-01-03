<template>
<transition name="fade">
  <div
    class="sidebar"
    :class="{
      'sidebar-closed': collapsed
    }"
    :style="{ left: collapsed ? '-9rem' : '0' , width: '180px'}"
  >
    <span v-show="collapsed" class="username" :style="{ marginLeft: collapsed ? '8rem' : 0 }">
      {{ user?.usuario?.charAt(0) }}
    </span>
    <div class="container-avatar" v-show="!collapsed">
      <div>
        <Avatar
          :avatar="user.avatar"
          :username="user.usuario"
          v-model="user.avatar"
        />
      </div>
    </div>
    <transition name="fade">
    <div class="menu" 
      :style="{ 
        display: collapsed ? 'block' : 'grid',
        justifyContent:  collapsed ? 'right' :'left',
        width: collapsed ? '2.5rem' : 'auto',
        marginLeft: collapsed ? '8rem' : 0 
      }">
      <div
        :style="{
          display: collapsed ? 'block' : ' flex',
        }"
      >
        <SidebarLink to="https://dminer.com.br/" icon="email" isIconLink external>
          <icon-email />
        </SidebarLink>

        <SidebarLink to="/birthday" icon="birthday" isIconLink>
          <icon-birthday />
        </SidebarLink>
      </div>

      <SidebarLink to="/documentos" icon="documentos">
        <icon-document />
        DOCUMENTOS
      </SidebarLink>
      <SidebarLink to="/beneficios" icon="benefícios">
        <icon-benefits />
        BENEFÍCIOS
      </SidebarLink>
      <SidebarLink to="/equipe" icon="Equipe">
        <icon-team />
        EQUIPE
      </SidebarLink>
      <SidebarLink to="/tutoriais" icon="fas fa-image">
        <icon-tutoriais />
        TUTORIAIS
      </SidebarLink>
      <SidebarLink to="/permissoes" icon="fas fa-image"  :disabled="permissionADM">
        <icon-permissions />
        PERMISSÕES
      </SidebarLink>
      <div @click="logout()">
        <SidebarLink to="/power" icon="power" isPower >
          <icon-power />
        </SidebarLink>
      </div>
    </div>
    </transition>

    <icon-base 
      icon-name="icon"       
      class="collapse_icon"
      :class="{ 'rotate-180': collapsed }"
      :onClick="toggleSidebar"
      width="1rem"
       :style="{ 
        marginLeft: collapsed ? '4.5rem' : 0 
      }"
    >
     <icon-open />
    </icon-base>

  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import SidebarLink from './SidebarLink.vue'
import Avatar from '@/components/Avatar.vue'
import IconBenefits from '@/components/svg/IconBenefits.vue'
import IconPermissions from '@/components/svg/IconPermissions.vue'
import IconTeam from '@/components/svg/IconTeam.vue'
import IconDocument from '@/components/svg/IconDocument.vue'
import IconTutoriais from '@/components/svg/IconTutoriais.vue'
import IconEmail from '@/components/svg/IconEmail.vue'
import IconBirthday from '@/components/svg/IconBirthday.vue'
import IconPower from '@/components/svg/IconPower.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconOpen from '@/components/svg/IconOpen.vue'

export default {
  props: { isLoading: { type: Boolean, required: false, default: false}},
  components: {
    SidebarLink,
    Avatar,
    IconBenefits,
    IconDocument,
    IconPermissions,
    IconTeam,
    IconTutoriais,
    IconBirthday,
    IconEmail,
    IconPower,
    IconEdit,
    IconBase,
    IconOpen
  },

  computed: mapState({
    user: (state) => state.user,
    collapsed: (state) => state.sidebar.collapsed,
    sidebarWidth: (state) => state.sidebar.sidebarWidth,
    permissionADM: (state) => state.user.type  !== 'ADMINISTRADOR'
  }),

  methods: {
    updateUser() {
      this.$emit('update:modelValue', this.user)
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    },
    toggleSidebar() {
      this.$store.dispatch('sidebar/toggleSidebar')
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-image: url(/src/assets/widget/sidebar.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  /* height: 100vh; */
  position: fixed;
  z-index: 9999;
  top: -1px;
  /* left: 0; */
  bottom: 0;
  padding: 1.5em;
  display: flex;
  flex-direction: column;

  transition: all 0.5s 0s ease;
}

.menu {
  justify-content: left;
  margin-top: 10%;
  overflow-y: auto;
  font-size: 0.8rem;
  font-family: var(--font-family--text);

  overflow-x: hidden;
}

.username {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.collapse_icon {
  position: absolute;
  bottom: 1rem;
  left: 40%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transform: rotate(180deg);
}

.rotate-180 {
  transform: rotate(0deg);
  left: 40%;
}
</style>
