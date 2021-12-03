<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalEquipe"
      title="Equipe"
      @close="this.$router.push('/')"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in getAllUsers" :key="key">
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
                      width="90%"
                      height="80%"
                      :avatar="getBase64(item.avatar)"
                      isBirthday
                    />
                  </div>
                  <div class="team_container_text">
                    <div class="team_container_name" :title="item.email">
                      {{ item.userName }} • {{ item.area }}
                    </div>
                    <div class="team_container_email">
                      {{ item.email }}
                    </div>
                    <div class="team_container_span">
                      <div class="icon_green"></div>
                      {{ item.birthDate }}
                      <div class="icon_green"></div>
                      <a :href="item.linkedinUrl" target="_blank">linkedin</a>
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
          </li>
        </ul>
      </template>
    </widget-modal>
  </transition>
  <form-user
    :showModal="showModal"
    @close="close"
    :value="value"
    :isEdit="isEdit"
  />
</template>

<script>
import Title from '@/components/title/Title.vue'
import Avatar from '@/components/Avatar.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'
import IconEdit from '@/components/svg/IconEdit.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameTeam from '@/components/svg/FrameTeam.vue'

import useAllUsers from '@/composables/useAllUsers'
import { getBase64 } from '@/util/convertBase64'

import { dayMounthFormart } from '@/util/date.js'

export default {
  data() {
    return { showModalEquipe: true, showModal: false, value: {}, isEdit: false }
  },
  setup() {
     const { getAllUsers } = useAllUsers()
    return { getAllUsers, dayMounthFormart, getBase64 }
  },
  components: {
    WidgetModal,
    Title,
    Avatar,
    // FormUser,
    IconEdit,
    IconBase,
    FrameTeam
  },


  methods: {
    // openModal() {
    //   this.showModal = true
    // },
    // edit(value) {
    //   this.isEdit = true
    //   this.setUser(value)
    // },
    // setUser(value) {
    //   this.value = value
    //   this.openModal()
    // }
    close() {
      this.setDocument()
      this.showModal = false
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  display: grid;
  grid-template-columns: 50% 50%;
  width: 90%;
  justify-items: center;
  margin: 0 auto;
}

li {
  display: grid;
  /* background-image: url(@/assets/widget/frame-team.svg);
  background-repeat: no-repeat;
  background-size: contain; */

  padding: 0.5rem;
  position: relative;
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

.team_btn_edit {
  border: none;
  position: absolute;
  right: -1rem;
  width: 24%;
  height: 1rem;
  top: 0.6rem;
  background: transparent;
  cursor: pointer;
}
.team_icon_edit {
  width: 24%;
  height: 1rem;
}

a {
  text-decoration: none;
  color: var(--color-text);
}
</style>
