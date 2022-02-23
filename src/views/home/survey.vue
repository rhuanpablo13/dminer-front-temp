<template>
  <widget-layout-home
    layout="icon-folder"
    title="enquete"
    classContent="folder__user__content"
    :onClick="permissionADM ? () => openModal() : null"
    :noRegistry="!list.length"
    :typeList="typeList"
  >
    <ul>
      <li
        class="user_li"
        v-for="(item, key) in list"
        :key="key"
        :id="`user_li_${key}`"
      >
        <div class="container_quiz">
          <div class="quiz_question" :style="{'cursor': permissionADM ? 'pointer' : 'default'}" @click="permissionADM && edit(item)"> 
            <span>{{ item.question }}</span>
          </div>
          <div class="quiz_footer" >
            <button :disabled="item.voted" type="button" class="first" @click="count(item.id, 'a')">
              <span>{{ item.optionA }}</span>
            </button>
            <button :disabled="item.voted" type="button" class="second" @click="count(item.id, 'b')">
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
    @submit="()=> this.sendForm()"
    @close="showModal = false"
  >
    <div class="form_container">
      <div style="display: flex; justify-self: right;" v-if="isEdit"> 
        <button class="team_btn_edit"  v-if="permissionADM">
          <icon-base
            icon-name="icon"
            class="team_icon_edit"
            @click="deleteBenefit(value.id)"
            width="1rem"
            heigth="1rem"
          >
            <icon-trash />
          </icon-base>
        </button>
      </div>

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
import { mapState } from 'vuex'

import FormModal from '@/components/FormModal.vue'
import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import FildDate from '@/components/input/FildDate.vue'
import FildInput from '@/components/input/Fild.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconCountQuiz from '@/components/svg/IconCountQuiz.vue'
import IconTrash from '@/components/svg/IconTrash.vue'

import { dateHourFormarUs } from '@/util/date.js'

export default {
  data() {
    return {
      typeList: 'survey',
      showModal: false,
      isEdit: false,
      isDelete: false,
      value: {
        question: '',
        date: new Date() + 1,
        optionA: '',
        optionB: ''
      }
    }
  },
  computed: mapState({
    permissionADM: (state) => state.user.adminUser  === 'ADMINISTRADOR',
    list: (state) => state.home.surveyList,
    getUser: (state) => state.user.login,
  }),

  methods: {
    count(id, item) {
      this.$store.dispatch('home/answer',
      { 
        id, item,
        typeList: this.typeList, 
        hasLogin: true,
        login: this.getUser,
      })
    },
    sendForm() {
      if (this.validForm() && !this.isDelete) {
        this.$store.dispatch(
          this.isEdit ? 'home/updateItemList' : 'home/createItemList', 
          {
            typeList: this.typeList, 
            value: this.value,
            hasLogin: true,
            login: this.getUser
          }
        )
        this.showModal = false
      } else {
        this.$store.dispatch('form/setError')
      }
    },
    validForm() {
      this.value.date = dateHourFormarUs(this.value.date)
      return  this.value.hasOwnProperty('question') && this.value?.question !== "" && 
              this.value.hasOwnProperty('date') && this.value?.date !== "" &&
              this.value.hasOwnProperty('optionA') && this.value?.optionA !== "" &&
              this.value.hasOwnProperty('optionB') && this.value?.optionB !== ""
    },
    openModal() {
      this.showModal = true
    },
    edit(_value) {
      this.$store.dispatch('list/setNoRegistry', false)
      this.isEdit = true
      this.isDelete = false
      this.value = _value
      this.showModal = true
    },
    deleteBenefit(id) {
      this.isDelete = true
      this.$store.dispatch('home/deleteItemList', 
        {
          typeList: this.typeList, 
          value: this.value,
          hasLogin: true,
          login: this.getUser,
          id
        }
      )
      this.showModal = false
    },
  },
  components: {
    WidgetLayoutHome,
    IconBase,
    IconCountQuiz,
    FormModal,
    FildInput,
    FildDate,
    IconTrash
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

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
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

.first:disabled, .second:disabled {
  border-top: transparent;
  border-left: transparent;
  border-bottom: 44px solid #ddd;
  cursor: pointer;
  background-color: transparent;
  cursor: not-allowed;
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

.item_view {
  margin-left: 3rem;
  text-align: left;
}

.team_btn_edit {
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>
