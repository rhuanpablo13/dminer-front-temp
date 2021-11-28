<template>
  <widget-layout-home
    layout="icon-folder"
    title="aniversário"
    classContent="folder__birthday__content"
  >
    <ul>
      <li
        class="birthday_li"
        v-for="(item, key) in getBirthdays"
        :key="key"
        :id="`birthday_li_${key}`"
      >
        <Avatar :avatar="item.avatar" isBirthday height="8rem" />

        <div class="notices_footer">
          <Title>{{ item.name }}</Title>
          <span>
            <b>Data:</b>
            {{ dayMounthFormart(item.dtBirthday) }}
          </span>
        </div>
      </li>
    </ul>
  </widget-layout-home>
</template>

<script>
import { mapState } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import Title from '@/components/title/Title.vue'
import Avatar from '@/components/Avatar.vue'

import { dayMounthFormart } from '@/util/date.js'
import { getBase64 } from '@/util/convertBase64'

export default {
  data() {
    return { dayMounthFormart, getBase64 }
  },
  computed: mapState({
    birthdayList: (state) => state.home.birthdayList
  }),

  components: {
    WidgetLayoutHome,
    Title,
    Avatar
  }
}
</script>

<style scoped>
.folder__birthday__content {
  width: 108%;
  margin-left: -12px;
}
ul {
  max-height: 358px;
  list-style-type: none;
}
li {
  /* display: grid;
  grid-template-columns: 40% 60%;
  justify-content: start;
  align-content: stretch;
  border: 1px solid;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  margin-right: 1rem; */

  display: flex;
  background-image: url(/src/assets/widget/frame-team.svg);
  background-repeat: no-repeat;
  background-size: contain;
  width: 90%;
  position: relative;
  text-align: left;
  gap: 1rem;
  padding: 1rem;
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
}
.icon_quiz_count {
  position: absolute;
  z-index: 2;
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
</style>
