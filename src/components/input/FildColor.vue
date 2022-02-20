
<template>
  <div class="container_color" @click="focus($event)">
    <div class="color_text">
      <div v-if="text" class="color_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>
			<div class="color_container_colorpicker">
				<span class="color_container_span"> {{ color }}	 </span>
        <color-input v-model="color" @change="changeInput" />
			</div>

    </div>
    <icon-base
      viewBox="0 0 500 58"
      width="100%"
      height="100%"
      class="fild_container_icon"
      :class="`container_color_${text}`"
    >
      <icon-line></icon-line>
    </icon-base>
    <div v-if="isError" class="fild_container_error">campo obrigatório</div>
  </div>
</template>

<script>
import ColorInput from 'vue-color-input'

import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

export default {
  data() {
    return {
      color: '#43df94'
    }
  },
	props: {
    text: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
		// color: { type: String, required: false, default: '#43df94' },
  },

  components: {
    ColorInput,
		IconLine, 
		IconBase 
  },
	computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value && this.required

      const circle = document.querySelector(
        `.container_color_${this.text} .icon__line > .st1`
      )

      if (circle) {
        circle.style.fill = error ? 'red' : 'var( --sidebar-green-ligth)'
      }

      return error
    }
  },
	methods: {
    changeInput() {
      this.$emit('update:modelValue', this.color)
    }
  }
}
</script>

<style >

.color_container_span {
  font-family: var(--font-family--text);
  font-weight: var(-  --font-weight--text);
  font-size: 0.8rem;
}

.container_color {
  position: relative;
  cursor: text;
}

.color_text {
  display: grid;
  gap: 0.5rem;
}

.color_label {
  text-transform: capitalize;
  text-align: start;
}

.color_container_colorpicker {
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto 2rem;
  margin-bottom: 0.8rem;
}

.color-input .box {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.2s, background-color 0.05s 0.15s;
}

.fild_container_icon {
  margin-top: -2rem;
  z-index: 3;
}

.fild_container_error {
  position: absolute;
  font-size: 0.5rem;
  color: red;
  text-align: start;
  margin-top: -0.4rem;
}

.vc-color-wrap.round {
  width: 1rem !important;
  height: 1rem !important;
  border-radius: 50% !important;
  border: none !important;
  margin-bottom: 0.2rem;
}

.vc-color-wrap{
  box-shadow: none!important;
}
</style>
