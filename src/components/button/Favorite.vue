<template>
  <icon-base
    style="cursor: pointer;"
    icon-name="icon"
    viewBox="0 0 500 500"
    width="10rem"
    height="10rem"
    @click="()=> this.$store.dispatch('post/getFavorite')"
  >
    <component
      :is="isError ? 'icon-button-error' : 'icon-button-favorite'"
      :click="onClick"
      id="send"
      class="send"
      :class="{
        'is-loading': isLoadingFavorite,
        'is-success': isSuccess,
        'is-error': isError
      }"
      :style="{ width: width}"
    >
      <svg viewBox="0 0 90.594 59.714" id="svgbtn" v-if="isSuccess">
        <polyline
          class="check"
          fill="none"
          stroke="#000000"
          stroke-width="10"
          stroke-miterlimit="10"
          points="1.768,23.532 34.415,56.179 88.826,1.768"
        />
      </svg>
      <span v-if="!isLoadingFavorite && !isSuccess && !isError">{{ text }}</span>
      <div class="out" v-if="isError">
        <icon-base
          viewBox="0 0 32 32"
          icon-name="icon"
          :width="width === '15%' ? '20%' : '60%'"
          :height="width === '15%' ? '20%' : '60%'"
          class="icon_close"
        >
          <icon-close />
        </icon-base>
      </div>

      <div class="lds-ellipsis" v-if="isLoadingFavorite">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </component>
  </icon-base>
</template>

<script>
import { mapState } from 'vuex'

import IconBase from '@/components/svg/IconBase.vue'
import IconButtonFavorite from '@/components/svg/IconButtonFavorite.vue'
import IconButtonError from '@/components/svg/IconButtonError.vue'
import IconClose from '@/components/svg/IconClose.vue'

export default {
  props: {
    width: { type: String, default: '15%', required: false },
    text: { type: String, default: 'Enviar', required: false }
  },
  computed: mapState({
    isLoadingFavorite: (state) => state.form.isLoadingFavorite,
    isError: (state) => state.form.isError,
    isSuccess: (state) => state.form.isSuccess
  }),

  components: {
    IconBase,
    IconButtonFavorite,
    IconButtonError,
    IconClose
  },
  emits: ['send'],
  methods: {
    onClick() {
      this.$emit('send')
    }
  }
}
</script>

<style scoped>
.button__primary {
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #231f20;
  outline: none;
  width: 100%;
  color: #231f20;
  font-family: var(--font-family--text);
  font-weight: var(--font-weight--text);
}

.send {
  cursor: pointer;
  font-size: 1rem;
  font-family: var(--font-family--text);
  position: relative;
  margin-top: -13px;
  color: black;

  width: 15%;
}

#svgbtn {
  width: 0;
  height: 0;
}

.is-loading {
  animation: pulse 1.5s infinite;
  margin: auto;
}

.is-loading #svgbtn {
  width: 15px;
  height: 15px;
}

.is-success {
  margin: auto;
}

.is-error .send {
  display: none;
  margin-top: -15%;
}

.is-error {
  display: flex;
  justify-content: center;
}

.out {
  display: none;
}

.icon_close {
  width: 20%;
  height: 20%;
  margin-bottom: 35px;
  color: #f21d1d;
  margin-top: 4.5rem;
}

.is-error .out {
  display: block;
  margin-top: -15%;
}

.is-success #svgbtn {
  width: 4rem;
  height: 3rem;
}

.check {
  stroke-dasharray: 130px 130px;
  stroke-dashoffset: 130px;
  transition: stroke-dashoffset 500ms ease-in-out;
}

.is-none {
  display: none;
}

.is-loading .lds-ellipsis {
  display: block;
}

.is-success .check {
  stroke-dashoffset: 0px;
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

.lds-ellipsis {
  display: none;
  position: relative;
  top: 40px;
  left: 40%;
}

.lds-ellipsis div {
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;

  background: #000000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 4px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 4px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
