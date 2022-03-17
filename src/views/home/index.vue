<template>
  <div class="view__home">
    <section class="header__section">
      <form action="#" @submit.prevent="submit">
        <inputDate v-model="inputValue" />
      </form>
    </section>
    <section class="container__section">
      <draggable :list="listComponents" @end="log">
        <div v-for="(folder, key) in listComponents" :key="key">
          <component :is="folder"></component>
        </div>
      </draggable>
    </section>
    <section class="footer__section"> {{ $store.getters.appVersion }} </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapState } from 'vuex'

import InputDate from '@/components/input/InputDate.vue'
import birthday from '@/views/home/birthday.vue'
import calendar from '@/views/home/calendar.vue'
import notification from '@/views/home/notification.vue'
import notices from '@/views/home/notices.vue'
import reminder from '@/views/home/reminder.vue'
import survey from '@/views/home/survey.vue'

import { VueDraggableNext } from 'vue-draggable-next'

export default {
  data() {
    return {
      listComponents: [],
      enabled: true,
      dragging: false,
      inputValue: '',
      update: false
    }
  },
  computed: mapState({
    login: (state) => state.user.login
  }),
  mounted() {
    if (localStorage.position_components_home) {
      this.listComponents = JSON.parse(localStorage.position_components_home)
    } else {
      this.listComponents = [
        'notification',
        'calendar',
        'birthday',
        'notices',
        'reminder',
        'survey'
      ]

      localStorage.position_components_home = JSON.stringify(
        this.listComponents
      )

      const data = { keyword: null, login: this.login }
      this.$store.dispatch('home/search', data)
      this.$store.dispatch('dropdown/getDropdownPermission')
      this.$store.dispatch('dropdown/getDropdownCategory')
      this.$store.dispatch('dropdown/getDropdownPriority')
    }
  },

  setup() {
    const search = ref('')

    return {
      search
    }
  },

  components: {
    InputDate,
    draggable: VueDraggableNext,
    notification,
    calendar,
    birthday,
    notices,
    reminder,
    survey
  },
  methods: {
    log(event) {
      localStorage.position_components_home = JSON.stringify(
        this.listComponents
      )
    },
    submit(event) {
      const data = { keyword: this.inputValue || null, login: this.login }
      this.$store
        .dispatch('home/search', data )
        .then((result) => {
          this.update = true
        })
    }
  }
}
</script>

<style scoped>
.view__home {
  /* display: grid;
  grid-template-rows: 1fr 3fr 3fr;
  height: 100%;
  padding: 0 6rem; */

  display: grid;
  padding: 0 3rem;
  width: 80%;
  margin: auto;
}

.container__section > div {
  width: 100%;
  top: 0;
  display: grid;
  align-items: center;
  gap: 0.5rem;
  grid-template-columns: 28.5% 28.5% 28.5%;
  /* justify-content: center; */
}

@media only screen and (max-width: 1080px) {
  .view__home {
    grid-gap: 1rem;
    padding: 0 4rem;
  }
  .container__section > div {
    display: contents;
    padding: 0.5rem;
    overflow-y: auto;
  }
}

.list-group-item {
  cursor: not-allowed;
}

.footer__section {
  position: fixed;
  bottom: 0;
  background-color: gray;
  height: 3rem;
}
</style>
