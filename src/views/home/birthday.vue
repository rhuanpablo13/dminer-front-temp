<template>
  <widget-layout-home
    layout="icon-folder"
    title="aniversário"
    classContent="folder__birthday__content"
  >
    <ul>
      <li v-for="(item, key) in birthdayList" :key="key">
          <icon-base
            viewBox="0 0 500 200"
            icon-name="icon"
            width="100%"
            height="100%"
          >
            <frame-team>
              <div class="birthday_container_li">
               <Avatar :avatar="item.avatar" isBirthday height="8rem" />

              <div class="birthday_text">
                <Title>{{ item.userName  }}</Title>
                <span>
                  <b>Data:</b>
                  {{item.birthDate}}
                </span>
              </div>
              </div>
            </frame-team>
          </icon-base>
      </li>
    </ul>
  </widget-layout-home>
</template>

<script>
import { mapState } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import Title from '@/components/title/Title.vue'
import Avatar from '@/components/Avatar.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameTeam from '@/components/svg/FrameTeam.vue'

export default {
  computed: mapState({
    birthdayList: (state) => state.home.birthdayList
  }),

  components: {
    WidgetLayoutHome,
    Title,
    Avatar,
    IconBase,
    FrameTeam
  }
}
</script>

<style scoped>
.folder__birthday__content {
  width: 108%;
  margin-left: -12px;
}
ul {
  list-style-type: none;
  margin: auto;
}

li {
  width: 85%;
  margin: auto;
}

.birthday_container_li {
  display: flex;
  gap: 1rem;
  justify-content: space-around;    
  width: 90%;
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

.birthday_text {
  font-size: 1.5rem;
}
</style>
