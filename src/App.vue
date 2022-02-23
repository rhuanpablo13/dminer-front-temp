<script>
import { mapState, useStore } from 'vuex'

import Sidebar from '@/components/sidebar/Sidebar.vue'
import Banner from '@/components/Banner.vue'
import Content from '@/components/Content.vue'
import Avatar from '@/components/Avatar.vue'

import Login from '@/views/login/index.vue'

import { diffDate } from '@/util/date'
import { setupAxiosToken } from '@/api/http'

export default {
  setup(){
    const store = useStore() 

    if (sessionStorage.getItem('timeout')) {
      const timeout = sessionStorage.getItem('timeout');

      const date = new Date(timeout)
      const now = new Date() 

      const diff = diffDate(now, date)

      if (diff >= 1800000 ) {
        store.dispatch('auth/logout')
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', (event) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      sessionStorage.removeItem('timeout');
      // localStorage.clear();

      //Para customizar o texto, e é necessário para funcionar no Safari e Chrome, IE e Firefox anterior a versão 4
      event.returnValue = '';
    });
  },
  components: { Sidebar, Banner, Content, Avatar, Login },
  computed: mapState({
    loggedIn: (state) => {
      if (state.auth.status.loggedIn) {
        const user = JSON.parse(localStorage?.user)
        const adminUser = user.adminUser === "USUÁRIO-INTRANET" ? 0 : 1
        setupAxiosToken(user.baererAuthentication, user.login, adminUser)
      }
      return state.auth.status.loggedIn
    },
    banner: (state) => !!state.user.banner,
  }),
}
</script>
<template>
  <transition name="fade" v-if="loggedIn">
    <div>
      <Sidebar :isLoading="banner"/>
      <Banner :isLoading="banner"/>

      <Content />
    </div>
  </transition>
  <transition name="fade" v-else>
    <Login />
  </transition>
</template>

<style>
@font-face {
  font-family: 'Swis721_LtEx_BT_Light';
  src: local('Swis721_LtEx_BT_Light'),
    url(./assets/fonts/Swis721_LtEx_BT_Light.ttf) format('truetype');
}

@font-face {
  font-family: 'Cera_Stencil_PRO_Medium';
  src: local('Cera_Stencil_PRO_Medium'),
    url(./assets/fonts/Cera_Stencil_PRO_Medium.otf) format('truetype');
}

:root {
  --sidebar-green-ligth: #aaff48;
  --sidebar-green-medium: #89f45f;
  --sidebar-green-dark: #43df94;
  --sidebar-green-opacity: #55e48663;
  --white: #ffffff;
  --black: #000000;

  --gray: #60645c;
  --rgbGray: 108, 117, 125;
  --bdColor: rgb(227, 228, 229);

  --sidebar-border: 2px solid var(--gray);
  --fine-border: 1px solid var(--gray);

  --avatar-border-left-right: 81px solid var(--sidebar-green-medium);
  --avatar-border-left-right-white: 81px solid white;
  --avatar-border-bottom-top: 30px solid transparent;
  --sidebar-item-active: var(--sidebar-green-opacity);
  --sidebar-item-hover: var(--sidebar-green-opacity);
  --sidebar-bg-color: linear-gradient(
    var(--sidebar-green-ligth),
    var(--sidebar-green-dark)
  );

  --gradient-linear-white-green: linear-gradient(
    to right,
    white,
    var(--sidebar-green-ligth)
  );

  --font-family--title: 'Cera_Stencil_PRO_Medium';
  --font-family--text: 'Swis721_LtEx_BT_Light';
  --font-weight--text: 300px;

  --color-title: var(--gray);
  --color-text: #2c3e50;

  --background-color: white;

  --background-color--disabled: white;

  scroll-behavior: smooth;
}

.vc-container {
  border: none !important;
}

/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--background-color);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--sidebar-green-ligth);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--sidebar-green-dark);
}

body {
  margin: 0;
}

:focus-visible {
  outline: none;
}

#app {
  font-family: var(--font-family--text);
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text);

  width: 100vw;
  overflow: hidden;
}

table {
  width: 100%;
  height: 100%;
}

input {
  font-family: var(--font-family--text);
  font-size: var(--font-size--text);
}

input:-internal-autofill-selected {
  appearance: menulist-button;
  background-image: none !important;
  background-color: transparent !important;
  color: -internal-light-dark(black, white) !important;
}

.multiselect-option {
  padding: var(--ms-option-py,.5rem) var(--ms-option-px,.75rem);
  font-size: 0.5rem !important;
  line-height: var(--ms-option-line-height,1.375);
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  text-decoration: none;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
}
</style>
