import { createApp } from 'vue'
import Vue3Resize from 'vue3-resize'
import VueSelect from 'vue-next-select'
import moshaToast from 'mosha-vue-toastify'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import store from './store'

import 'mosha-vue-toastify/dist/style.css'
import 'vue3-resize/dist/vue3-resize.css'

createApp(App)
  .use(router)
  .use(Vue3Resize)
  .use(moshaToast)
  .use(VueAxios, axios)
  .use(store)
  .component('vue-select', VueSelect)
  .component('modal', {
    template: '#modal-template'
  })
  .mount('#app')
