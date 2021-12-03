<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: Element, required: true },
    isIconLink: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false, default: false },
    isPower: { type: Boolean, required: false }
  },
  components: { IconBase, IconLine },
  computed: {
    collapsed() {
      return this.$store.state.sidebar.collapsed
    }
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return { isActive }
  }
}
</script>

<template>
  <router-link
    :to=" disabled ? '' : to"
    class="link"
    :class="{ active: isActive, disabled: disabled }"
    :style="{
      'justify-content': isIconLink || isPower ? 'center' : '',
    }"
    :disabled="disabled"
  >
    <icon-base icon-name="icon"  >
      <slot />
    </icon-base>
    <transition name="fade">
      <span v-if="!collapsed">
        <slot />
      </span>
    </transition>

    <icon-base
      v-if="collapsed || !isIconLink"
      viewBox="0 0 500 58"
      width="100%"
      height="100%"
      class="fild_container_icon"
    >
      <icon-line />
    </icon-base>
  </router-link>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;

  cursor: pointer;
  position: relative;

  font-family: 'Swis721_LtEx_BT_Light', Helvetica, Arial;
  user-select: none;

  margin: 0.1em 0;
  padding: 0.8em 0;
  /* border-radius: 0.25em; */

  color: black;
  text-decoration: none;

  width: 100%;
  gap: 0.2rem;
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link.active {
  background-color: var(--sidebar-item-active);
}

.link.disabled {
  cursor: not-allowed;
  color: var(--gray);
}


.link .icon {
  flex-shrink: 0;
  width: 25px;
  margin-right: 10px;
}

.fild_container_icon {
  /* position: absolute;
  bottom: 0;
  left: 0;
  /* width: fit-content;

  grid-area: icon;
  transform: rotateY(180deg); */

  margin-top: -30px;
  z-index: 3;
  position: absolute;
  top: -5px;
}
</style>
