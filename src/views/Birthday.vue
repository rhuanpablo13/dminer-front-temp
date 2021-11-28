<template>
  <transition name="modal">
    <widget-modal
      v-if="showModalEquipe"
      title="Aniversariantes"
      @close="this.$router.push('/')"
    >
      <template v-slot:body>
        <ul>
          <li v-for="(item, key) in birthdayList" :key="key">
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
                <div class="team_container_name">
                  {{ item.name }} • {{ item.area }}
                </div>

                <div class="team_container_span">
                  <div class="icon_green"></div>
                  {{ dayMounthFormart(item.dtBirthday) }}
                  <div class="icon_green"></div>
                  <a :href="item.linkedin" target="_blank">linkedin</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </widget-modal>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import Title from '@/components/title/Title.vue'
import Avatar from '@/components/Avatar.vue'
import WidgetModal from '@/components/widget/WidgetModal.vue'

import { dayMounthFormart } from '@/util/date.js'
import { getBase64 } from '@/util/convertBase64'

export default {
  data() {
    return { showModalEquipe: true, dayMounthFormart, getBase64 }
  },
  computed: mapState({
    birthdayList: (state) => state.home.birthdayList
  }),

  methods: {
    openModal() {
      this.showModal = true
    }
  },
  components: {
    WidgetModal,
    Title,
    Avatar
  }
}
</script>

<style scoped>
ul {
  max-height: 358px;
  list-style-type: none;
  display: grid;
  grid-template-columns: 50% 50%;
  width: 90%;
  justify-items: center;
  overflow: scroll;
}

li {
  display: grid;
  background-image: url(@/assets/widget/frame-team.svg);
  background-repeat: no-repeat;
  background-size: contain;

  width: 90%;
  height: 100%;
  position: relative;
}

.team_container {
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 1rem;
  padding-left: 2rem;
}

.team_container_text {
  font-size: 0.6rem;
  justify-self: start;
  align-self: center;
  text-align: start;
  margin-top: -1.5rem;

  display: grid;
  grid-template-rows: 50% 40% 33%;

  text-transform: uppercase;
}

.team_container_name {
  font-family: var(--font-family--title);
  font-size: 0.7rem;
  font-weight: var(--font-weight);
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
}
</style>
