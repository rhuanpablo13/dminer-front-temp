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
          <slot />
        </div>
        <div class="notices__footer" v-if="hasButton">
          <icon-base
            :onClick="()=> $store.dispatch('post/setFavorite',  id)"
            width="70"
            height="70"
            class="icons"
          >
            <component :is="favorite"  />
          </icon-base>
          <icon-base
            viewBox="0 0 1024 1024"
            icon-name="icon"
            class="edit-icon icons"
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
import IconButton from '@/components/svg/IconButton.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconFolderNotification from '@/components/svg/IconFolderNotification.vue'
import IconFolderReminder from '@/components/svg/IconFolderReminder.vue'
import IconSidebar from '@/components/svg/IconSidebar.vue'
import IconFolder from '@/components/svg/IconFolder.vue'
import IconFolderFeed from '@/components/svg/IconFolderFeed.vue'
import IconFavorite from '@/components/svg/IconFavorite.vue'
import IconFavoriteDsabled from '@/components/svg/IconFavoriteDsabled.vue'

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
    isFavorite: { type: Boolean, required: false, default: true },
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
    IconFavoriteDsabled
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
}
</style>
