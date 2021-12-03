<template>
  <widget-layout-home
    layout="icon-folder"
    title="enquete"
    classContent="folder__user__content"
    :onClick="openModal"
  >
    <ul>
      <li
        class="user_li"
        v-for="(item, key) in $store.state.home.quizList"
        :key="key"
        :id="`user_li_${key}`"
      >
        <div class="container_quiz">
          <div class="quiz_question">
            <span>{{ item.question }}</span>
          </div>
          <div class="quiz_footer">
            <button type="button" class="first" @click="count(item.id, 'a')">
              <span>{{ item.optionA }}</span>
            </button>
            <button type="button" class="second" @click="count(item.id, 'b')">
              <span>{{ item.optionB }}</span>
            </button>
          </div>
        </div>

        <icon-base
          viewBox="0 0 300 500"
          icon-name="icon"
          class="icon_quiz_count"
          width="100%"
          height="65%"
        >
          <icon-count-quiz>
            <div class="quiz_count">
              <div>{{ item.countA }}</div>
              <div>{{ item.countB }}</div>
            </div>
          </icon-count-quiz>
        </icon-base>
      </li>
    </ul>
  </widget-layout-home>

  <form-modal
    :showModal="showModal"
    title="cadastro de enquete"
    @submit="sendForm"
    @close="showModal = false"
  >
    <div class="form_container">
      <div class="form_container_text">
        <fild-input
          :text="'Pergunta'"
          v-model="value.question"
          :value="value.question"
          required
        />

        <fild-input
          :text="'Resposta A'"
          v-model="value.optionA"
          :value="value.optionA"
          required
        />

        <fild-input
          :text="'Resposta B'"
          v-model="value.optionB"
          :value="value.optionB"
          required
        />

        <fild-date
          :text="'Valido até'"
          v-model="value.date"
          :value="value.date"
          required
        />
      </div>
    </div>
  </form-modal>
</template>

<script>
import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconCountQuiz from '@/components/svg/IconCountQuiz.vue'

import useQuiz from '@/composables/useQuiz'
import { dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
      showModal: false,
      value: {
        question: '',
        date: new Date() + 1,
        optionA: '',
        optionB: ''
      }
    }
  },
  setup() {
    const { updateCount, create } = useQuiz()
    return { updateCount, create }
  },

  methods: {
    count(id, item) {
      this.$store.dispatch('home/answer',{ id, item})
    },
    sendForm() {
      this.$store.dispatch('form/setLoading')

      if (this.validForm()) {
        let result = this.isEdit
          ? this.update(this.value)
          : this.create(this.value)

        this.$store.dispatch('form/setLoading')
        if (result) {
          this.$store.dispatch('form/setSuccess').then(() => {
            this.$emit('close')
          })
        }
      } else {
        this.$store.dispatch('form/setLoading')
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.date = dateHourFormarUs(this.value.date)
      return Object.values(this.value).every((item) => !!item)
    },
    openModal() {
      this.showModal = true
    }
  },
  components: {
    WidgetLayoutHome,
    IconBase,
    IconCountQuiz,
    FormModal,
    FildInput,
    FildDate
  }
}
</script>

<style scoped>
.folder__user__content {
  width: 108%;
  margin-left: -12px;
}
ul {
  list-style-type: none;
  position: relative;
  width: 27rem;
}
li {
  height: 23rem;
  display: flex;
  position: relative;
  margin-left: -1rem;
}

.container_quiz {
  border: 1px solid;
  margin-bottom: 2.5rem;
  z-index: 4;
  background: white;
  border-radius: 7px;
  display: grid;
  grid-template-rows: 80% 20%;
  padding: 0.5rem;
  width: 50rem;
  height: 13rem;
}
.icon_quiz_count {
  /* position: absolute; */
  z-index: 2;
  width: 40rem;
  margin-left: -146px;
}

.quiz_question {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-family--text);
}
.quiz_footer {
  display: flex;
  justify-content: space-evenly;
}

.quiz_count {
  font-size: 5rem;
  color: white;
  font-family: var(--font-family--text);
}

button {
  width: 50%;
  background-color: #aaff48;
  border: none;
  text-transform: uppercase;
  font-size: 1rem;
  font-family: var(--font-family--text);
  cursor: pointer;
  position: relative;
}

button > span {
  position: absolute;
  left: 40%;
  transform: translate(0, 50%);
}
.first {
  border-top: transparent;
  border-left: transparent;
  border-right: 8px solid transparent;
  border-bottom: 44px solid #aaff48;
  cursor: pointer;
  background-color: transparent;
}

.second {
  border-top: transparent;
  border-right: transparent;
  border-left: 8px solid transparent;
  border-bottom: 44px solid #aaff48;
  cursor: pointer;
  background-color: transparent;
  color: red;
}

.form_container {
  display: grid;

  width: 100%;
  height: 100%;
  margin: auto;
  justify-items: stretch;
  padding: 2rem;

  width: 80%;
  margin: auto;
}

.form_container_text {
  display: grid;
  grid-template-columns: 45% 45%;
  grid-gap: 10%;
}
</style>
