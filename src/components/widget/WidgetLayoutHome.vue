<template>
  <icon-base class="container__notices" icon-name="icon" viewBox="0 0 500 500">
    <component :is="layout">
      <div class="wrapper__notices">
        <div class="notices__head">
          <h2>{{ title }}</h2>
        </div>
        <div
          class="notices__content"
          :class="classContent"
          :style="{ 'max-height': !isExpanded && '18rem' }"
          :id="id"
        >
          <loading v-if="isLoading"/>
          <has-registry v-if="!isLoading && lengthList" style="text-align: revert; margin: auto;"/>

          <slot  v-if="!lengthList"/>
        </div>
        <div class="notices__footer" v-if="hasButton">
          <icon-base
            :onClick="()=>this.$emit('favoriteAction')"
            width="70"
            height="70"
            class="icons"
            v-if="isFavorite"
          >
            <component :is="favorite"  />
          </icon-base>
          <icon-base
           v-if="onClick"
            viewBox="0 0 1024 1024"
            icon-name="icon"
            :class="{'icons': isFavorite, 'icon': !isFavorite}"
            :onClick="onClick"
            width="70"
            height="70"
            :styles="onClick && 'cursor: pointer;'"
          >
            <icon-button />
          </icon-base>
        </div>
      </div>
    </component>
  </icon-base>
</template>

<script>
import { mapState } from 'vuex'

import IconButton from '@/components/svg/IconButton.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconFolderNotification from '@/components/svg/IconFolderNotification.vue'
import IconFolderReminder from '@/components/svg/IconFolderReminder.vue'
import IconSidebar from '@/components/svg/IconSidebar.vue'
import IconFolder from '@/components/svg/IconFolder.vue'
import IconFolderFeed from '@/components/svg/IconFolderFeed.vue'
import IconFavorite from '@/components/svg/IconFavorite.vue'
import IconFavoriteDsabled from '@/components/svg/IconFavoriteDsabled.vue'
import Loading from '@/components/Loading.vue'
import HasRegistry from '@/components/NoRegistry.vue'

export default {
  props: {
    title: { type: String, required: true },
    isExpanded: { type: Boolean, required: false, default: false },
    onClick: { type: Function, required: false },
    classContent: { type: String, required: false },
    id: { type: String, required: false },
    hasButton: { type: Boolean, required: false, default: true },
    layout: { type: String, required: true },
    favorite: { type: String, required: false, default: 'icon-favorite-dsabled' },
    isFavorite: { type: Boolean, required: false, default: false },
    noRegistry: { type: Boolean, required: false, default: false },
    typeList: { type: String, required: false, default: '' },
  },
  created(){
    console.log(this.noRegistry);
  },
  computed: {
    isLoading() { return this.$store.state.home.isLoading},
    lengthList() {
      if (this.typeList === "") return 
      return this.$store.state.home[`${this.typeList}List`].length <= 0
    }
  },
  components: {
    IconBase,
    IconButton,
    IconFolderNotification,
    IconFolderReminder,
    IconSidebar,
    IconFolderFeed,
    IconFolder,
    IconFavorite,
    IconFavoriteDsabled,
    Loading,
    HasRegistry
  }
}
</script>

<style scoped>
.container__notices {
  width: 100%;
  height: 100%;
}

.wrapper__notices {
  display: grid;
  grid-auto-rows: 1fr 4.1fr 1fr;
  padding: 0 1rem;
}

.notices__head {
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
}

.notices__content {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 300px;
}

.notices__footer {
  display: contents;
  /* justify-content: flex-end;
  align-items: end;
  margin-top: 5px; */
}

h2 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
}

.icons {
  justify-self: right;
  margin-top: -1rem;
  cursor: pointer;
  /* margin-right: -1rem; */
}

.icon {
  justify-self: right;
  margin-right: -1rem;
  cursor: pointer;
}
</style>
