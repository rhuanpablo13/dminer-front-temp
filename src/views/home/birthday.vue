<template>
  <widget-layout-home
    layout="icon-folder"
    title="aniversário"
    classContent="folder__birthday__content"
    :onClick="() => $router.push('/birthday')"
    :noRegistry="!list.length"
    :typeList="typeList"
  >
    <ul>
      <li v-for="(item, key) in list" :key="key"  @click="setDoc(item)">
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
                <h1>{{ item.userName  }}</h1>
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

    <transition name="modal">
    <widget-modal
      v-if="showModalView"
      title="aniversário"
      @close="showModalView = false"
    >
      <template v-slot:body>
        <div class="item_view">
            <icon-base
              viewBox="0 0 500 200"
              icon-name="icon"
              width="100%"
              height="100%"
            >
              <frame-team>
                <div class="team_container">
                  <div class="team_avatar">
                    <Avatar
                      width="8rem"
                      height="7rem"
                      :avatar="itemView.avatar"
                      isBirthday
                    />
                  </div>
                  <div class="team_container_text">
                    <div class="team_container_name" :title="itemView.email">
                      {{ itemView.userName }} • {{ itemView.area }}
                    </div>
                    <div class="team_container_email">
                      {{ itemView.email }}
                    </div>
                    <div class="team_container_span">
                      <div class="icon_green" v-if="itemView.birthDate"></div>
                      {{ itemView.birthDate }}
                      <div class="icon_green"></div>
                      <a :href="itemView.linkedinUrl" target="_blank">linkedin</a>
                    </div>
                  </div>
                </div>
                <!-- <button class="team_btn_edit">
                  <icon-base
                    icon-name="icon"
                    class="team_icon_edit"
                    @click="edit(item)"
                  >
                    <icon-edit />
                  </icon-base>
                </button> -->
              </frame-team>
            </icon-base>
        </div>
      </template>
    </widget-modal>
  </transition>

</template>

<script>
import { mapState } from 'vuex'

import WidgetLayoutHome from '@/components/widget/WidgetLayoutHome.vue'
import Avatar from '@/components/Avatar.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameTeam from '@/components/svg/FrameTeam.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'

export default {
  data() {
    return {
      showModalView: false,
      itemView: {}
    }
  },
  computed: mapState({
    list: (state) => state.home.birthdayList,
  }),
  methods: {
    setDoc(_item) {
      this.showModalView = true
      this.itemView = _item
    },
  },

  components: {
    WidgetLayoutHome,
    Avatar,
    IconBase,
    FrameTeam,
    WidgetModal
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
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
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

h1 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 14rem;
}

.item_view {
  margin-left: 5rem;
  text-align: left;
}

.team_container {
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 1rem;
  padding-left: 2rem;
}

.team_container_text {
  justify-self: start;
  align-self: center;
  text-align: start;
  display: grid;
  line-height: 2rem;
  text-transform: uppercase;
  width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team_container_name {
  font-family: var(--font-family--title);
  font-size: 1.5rem;
  font-weight: var(--font-weight);
}

.team_container_email {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 20rem;
}
.team_container_span {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.icon_green {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--sidebar-green-ligth);
}
</style>
