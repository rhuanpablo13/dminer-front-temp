<template>
  <icon-base
    class="container__reminder"
    icon-name="icon"
    :onClick="onClick"
    viewBox="0 0 500 500"
    width="100%"
    height="100%"
  >
    <icon-sidebar>
      <div class="wrapper__reminder">
        <div class="reminder__head">
          <h1>{{ title }}</h1>
        </div>
        <div
          :class="classContent"
          class="reminder__content"
          :style="{ 'max-heitemplateht': !isExpanded && '18rem' }"
          :id="id"
        >
          <slot />
        </div>
        <div class="reminder__footer" v-if="hasButton">
          <icon-base
            viewBox="0 0 1024 1024"
            icon-name="icon"
            class="folder_button"
            :onClick="onClick"
            width="70"
            height="70"
            :styles="onClick && 'cursor: pointer;'"
          >
            <icon-button />
          </icon-base>
        </div>
      </div>
    </icon-sidebar>
  </icon-base>
</template>

<script>
import IconButton from '@/components/svg/IconButton.vue'
import IconNotices from '@/components/svg/IconNotices.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconFolderReminder from '@/components/svg/IconFolderReminder.vue'
import IconSidebar from '@/components/svg/IconSidebar.vue'

export default {
  props: {
    title: { type: String, required: true },
    isExpanded: { type: Boolean, required: false, default: false },
    onClick: { type: Function, required: false },
    classContent: { type: String, required: false },
    id: { type: String, required: false },
    hasButton: { type: Boolean, required: false, default: true }
  },
  components: {
    IconBase,
    IconButton,
    IconNotices,
    IconFolderReminder,
    IconSidebar
  }
}
</script>

<style scoped>
.container__reminder {
  width: 100%;
  height: 100%;
}

.wrapper__reminder {
  display: grid;
  grid-auto-rows: 1fr 4.1fr 1fr;
  padding: 0 1rem;
}

.reminder__head {
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
}

.reminder__content {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 300px;
}

.reminder__footer {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin-top: 5px;
}

h1 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
}
</style>
