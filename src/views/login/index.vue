<template>
  <div class="conatiner_login">
    <div class="login_img">
      <div class="login_logo_completa"></div>
    </div>
    <filter-vue @submit="sendForm" text="Entrar" isLogin  @keyup.enter="sendForm">
      <div class="login_form">
        <div class="login_form_container">
          <div class="login_logo"></div>
          <fild-input
            :text="'Usuário'"
            v-model="value.userName"
            :value="value.userName"
            required
          />
          <fild-input
            text="Senha"
            v-model="value.userPassword"
            :value="value.userPassword"
            required
            type="password"
          />

          <fild-checkbox
            text="Lembrar senha"
            v-model="reminderPassword"
            :value="reminderPassword"
            type="checkbox"
            @change="changeCheckbox()"
          />
        </div>
      </div>
    </filter-vue>
  </div>
</template>
<script>
import FilterVue from '@/components/Filter.vue'
import FildInput from '@/components/input/Fild.vue'
import FildCheckbox from '@/components/input/FildCheckbox.vue'
import FildSelect from '@/components/input/FildSelect.vue'
import Send from '@/components/button/Send.vue'

export default {
  data() {
    return {
      reminderPassword: false,
      // value: {
      //   userName: 'matheus.ribeiro1',
      //   userPassword: '#Matheus97',
      //   type: 'intranet'
      // }
      value: {
        userName: '',
        userPassword: '',
        type: 'intranet'
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    const reminderPassword =  this.localStorageVerify()
    if (reminderPassword && localStorage.userReminder) {

      this.reminderPassword = true
      const user = JSON.parse(localStorage.userReminder)
      this.value = {
        userName: user.userName,
        userPassword: user.userPassword,
        type: 'intranet'
      }
    }

    if (this.loggedIn) {
      this.$router.push('/')
    }
  },

  methods: {
    localStorageVerify() {
      return localStorage?.reminderPassword ? JSON.parse(localStorage.reminderPassword) : false
    },
    changeCheckbox() {
      const reminderPassword =  this.localStorageVerify()

      if (!reminderPassword && (this.value.userName || this.value.userPassword)) {
        localStorage.reminderPassword = true
        localStorage.userReminder = JSON.stringify(this.value)
      } else if(reminderPassword) {
        localStorage.reminderPassword = false
        localStorage.userReminder = null
      }
    },
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        this.$store.dispatch('auth/login', this.value).then(
          () => {
            this.$store.dispatch('form/setLoading')
            this.$router.push('/')
            sessionStorage.setItem('timeout', new Date());

            const timeout = setInterval(() => {
              this.$store.dispatch('auth/logout')
              clearInterval(timeout)
            },  1800000) // 1800000 = 30m
          },
          (error) => {
            this.$store.dispatch('form/setLoading')
            this.$store.dispatch('form/setError')
          }
        )
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      return Object.values(this.value).every((item) => !!item)
    }
  },
  components: {
    FildInput,
    Send,
    FildSelect,
    FildCheckbox,
    FilterVue
  }
}
</script>
<style scoped>
.conatiner_login {
  display: grid;
  grid-template-columns: 65% 35%;
  height: 100vh;
  width: 100vw;
  transition: all 0.5s 0s ease;
}

.login_img {
  display: flex;
  background-image: linear-gradient(
    to top left,
    #daf880,
    #59c700,
    #daf880,
    #daf880,
    #daf880,
    #59c700,
    #daf880
  );

  transition: all 0.5s 0s ease;
}

.login_logo_completa {
  background-image: url(@/assets/widget/logo_completa.svg);
  background-repeat: no-repeat;
  background-position: center;
  width: 50%;
  height: 50%;
  margin: auto;
}

.login_logo {
  background-image: url(@/assets/widget/logo.svg);
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
  padding: 4rem;
  margin-bottom: 2rem;
}

.login_form {
  display: grid;
  align-items: center;
  justify-self: center;
  width: 100%;
  padding: 1rem;
  height: 100%;
}

.login_button {
  width: 30%;
  margin: auto;
}

.login_form_container {
  padding: 5rem;
  font-size: 1.5rem;
  height: auto;
  margin-top: -5rem;
}

@media only screen and (max-width: 1080px) {
  .login_img {
    display: none;
  }

  .conatiner_login {
    display: grid;
    grid-template-columns: 100%;
    height: 100vh;
    width: 100vw;
  }
}
</style>
