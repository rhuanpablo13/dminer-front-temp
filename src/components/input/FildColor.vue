
<template>
  <div class="container_color" @click="focus($event)">
    <div class="color_text">
      <div v-if="text" class="color_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>
			<div class="color_container_colorpicker">
				{{ currentColor?.state?.pureColor }}	
				<color-picker 
					ref="currentColor" 
					v-model:pureColor="color"  
					format="hex" 
					shape="circle" 
					pickerType="chrome"
					@update:pureColor="changeInput"
				/>
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
import { ref } from 'vue'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

export default {
	props: {
    text: { type: String, required: false },
    value: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
		color: { type: String, required: false, default: '#43df94' },
  },

  components: {
    ColorPicker,
		IconLine, 
		IconBase 
  },
	setup(props, context) {
		const currentColor = ref();
		return { currentColor }
	},
	computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value

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
    changeInput(color) {
      this.$emit('update:modelValue', color)
    }
  }
}
</script>

<style scoped>
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
</style>
