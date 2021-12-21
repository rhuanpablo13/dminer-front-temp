<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <icon-base
        class="container__folder"
        icon-name="icon"
        :viewBox="viewbox"
        width="70%"
        height="100%"
        :style="{ marginLeft: sidebarWidth }"
      >
        <component :is="layout">
          <div class="modal-container" :style="{ width: width }">
            <div class="modal-header">
              <div class="modal_head_title">
                <h1>{{ title }}</h1>
              </div>
              <button :class="classButton" @click="$emit('close')">
                <icon-base
                  class="icon__feed"
                  icon-name="icon"
                  viewBox="0 0 500 500"
                  width="80%"
                  height="80%"
                >
                  <icon-button-close></icon-button-close>
                </icon-base>
              </button>
            <section class="header__section" v-if="search">
              <form action="#" @submit.prevent="$emit('change')">
                <fild-search @change="$emit('change')"/>
              </form>
            </section>
            </div>
            <div class="modal-left">
              <slot name="left" />
            </div>
            <div
              :class="{
                'modal-body': overflow,
                'modal-body-no-overflow': !overflow
              }"
            >
              <slot name="body"></slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
          <div class="folder__footer" v-if="onClick">
            <icon-base
              viewBox="0 0 1024 1024"
              icon-name="icon"
              :onClick="onClick"
              width="70"
              height="70"
              :styles="onClick && 'cursor: pointer;'"
            >
              <icon-button />
            </icon-base>
          </div>
        </component>
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconModal from '@/components/svg/IconModal.vue'
import IconFolder from '@/components/svg/IconFolder.vue'
import IconFolderFeed from '@/components/svg/IconFolderFeed.vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconButtonClose from '@/components/svg/IconButtonClose.vue'
import IconModalFolder from '@/components/svg/IconModalFolder.vue'
import IconButton from '@/components/svg/IconButton.vue'
import FildSearch from '@/components/input/FildSearch.vue'

export default {
  data () {
    return {inputValue: ''}
  },
  props: {
    layout: { type: String, required: false, default: 'icon-modal-folder' },
    width: { type: String, required: false, default: '100%' },
    viewbox: { type: String, required: false, default: '0 0 700 500' },
    title: { type: String, required: true, default: '' },
    onClick: { type: Function, required: false, default: '' },
    overflow: { type: Boolean, required: false, default: true },
    search: { type: Boolean, required: false, default: false },
    classButton: {
      type: String,
      required: false,
      default: 'modal-default-button'
    }
  },
  computed: {
    sidebarWidth() {
      return this.$store.state.sidebar.sidebarWidth
    }
  },
  components: {
    IconBase,
    IconModal,
    IconButtonClose,
    IconFolder,
    IconModalFolder,
    IconFolderFeed,
    IconButton,
    FildSearch
  }
}
</script>

<style scoped>
.header__section {
  width: 80%;
  margin: auto;
  margin-top: -2rem;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;

  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;

  height: 100vh;
}

.modal-container {
  margin-left: auto;
  margin-right: 3rem;
  position: relative;
  margin-top: 3.5rem;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 1rem 0;
  width: 95%;
  max-height: 330px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 20rem
}
.modal-body-no-overflow {
  margin: 20px 0;
  width: 95%;

  overflow-y: hidden;
}

.modal-left {
  position: absolute;
  left: -8rem;
  display: grid;
  justify-items: flex-start;
  font-size: 0.3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  grid-gap: 0.3rem;
  width: 5rem;
}

.modal-default-button {
  display: block;
  margin-top: -5rem;
  position: absolute;
  right: 3rem;
  width: 2rem;
  padding: 0rem;
  cursor: pointer;
  background: transparent;
  border: none;
}

.modal-default-button-calendar {
  display: block;
  margin-top: -2rem;
  position: absolute;
  right: -1rem;
  width: 1.5rem;
  padding: 0rem;
  cursor: pointer;
  background: transparent;
  border: none;
}

.modal-default-button-calendar:hover,
.modal-default-button:hover {
  animation: pulse 1.5s infinite;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

h1 {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  text-align: right;
  margin-right: 6rem;
  margin-top: -0.5rem;
  text-transform: uppercase;
}

.modal-footer {
  position: absolute;
  bottom: 20px;
  right: 4rem;
  width: 100%;
  display: flex;
  justify-content: right;
}

.folder__footer {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  width: 100%;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 50px rgba(69, 152, 27, 0);
  }
  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 rgba(69, 152, 27, 0);
  }
}
</style>
