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

              <div class="birthday_text" :title="item.userName">
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

.birthday_text {
  font-size: 1rem;
  line-height: 2rem;
  text-align: start;
}

span {
  margin-top: -1rem;
}
</style>
