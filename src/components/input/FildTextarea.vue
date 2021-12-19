<template>
  <div class="container_input" @click="focus($event)">
    <div class="input_text">
      <div v-if="text" class="input_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>
      <textarea
        :id="`container_input_${text}`"
        class="input_form"
        @change="changeInput"
        :required="required"
        :value="value"
      />
    </div>
    <icon-base
      viewBox="0 0 500 58"
      width="100%"
      height="100%"
      class="fild_container_icon"
      :class="`container_input_${text}`"
    >
      <icon-line></icon-line>
    </icon-base>
    <div v-if="isError" class="fild_container_error">campo obrigatório</div>
  </div>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

export default {
  components: { IconLine, IconBase },
  props: {
    text: { type: String, required: false },
    value: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    type: { type: String, required: false, default: 'text' }
  },

  computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value

      const circle = document.querySelector(
        `.container_input_${this.text} .icon__line > .st1`
      )

      if (circle) {
        circle.style.fill = error ? 'red' : 'var( --sidebar-green-ligth)'
      }

      return error
    }
  },

  methods: {
    focus(e) {
      const input = document.getElementById(`container_input_${this.text}`)
      input.focus()
    },
    changeInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style scoped>
.container_input {
  position: relative;
  cursor: text;
}

.input_text {
  display: grid;
  gap: 0.5rem;
}

.input_label {
  text-transform: capitalize;
  text-align: start;
}

.fild_container_icon {
  transform: rotateY(180deg);
  margin-top: -30px;
  z-index: 3;
}

.input_form {
  /* background-color: red; */
  border: none;
  /* border-bottom: 1px solid #231f20; */
  outline: none;
  transition: none;
  width: 100%;
  font-size: 0.4rem;
  line-height: 0.5rem;
  color: var(--dp-text-color);
  box-sizing: border-box;
  text-overflow: ellipsis;
  z-index: 4;
  padding: 0;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  background-color: transparent;
}

.fild_container_error {
  position: absolute;
  font-size: 0.5rem;
  color: red;
  text-align: start;
  margin-top: -1.5rem;
}
</style>
