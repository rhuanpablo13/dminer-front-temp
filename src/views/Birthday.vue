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
      </template>
    </widget-modal>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

import Avatar from '@/components/Avatar.vue'
import IconBase from '@/components/svg/IconBase.vue'
import FrameTeam from '@/components/svg/FrameTeam.vue'
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
    Avatar,
    IconBase,
    FrameTeam
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

</style>
