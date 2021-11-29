<template>
  <div class="container_input" @click="focus($event)">
    <div>
      <div v-if="text" class="input_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>

      <vue-select
        :id="`container_input_${text}`"
        :options="options"
        close-on-select
        placeholder=""
        @update:modelValue="changeInput"
        :reduce="(item) => item.id"
        :label-by="title"
      ></vue-select>

      <div>
        <icon-base
          viewBox="0 0 500 58"
          width="100%"
          height="100%"
          class="fild_container_icon_select"
          :class="`container_input_${text}`"
        >
          <icon-line></icon-line>
        </icon-base>
      </div>
      <div v-if="isError" class="fild_container_error">campo obrigatório</div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

export default {
  setup(props) {
    const value = reactive({})
    const options = reactive(props.options)

    const verifyLabelIndex = Object.keys(options).filter((option) =>
      options[option].hasOwnProperty('title')
    )

    return {
      value,
      options,
      title: verifyLabelIndex.length ? 'title' : 'name'
    }
  },

  computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value
      const circle = document.querySelector(
        `.container_input_${this.text} .icon__line > .st1`
      )

      if (circle)
        circle.style.fill = error ? 'red' : 'var( --sidebar-green-ligth)'

      return error
    }
  },
  components: { IconLine, IconBase, VueSelect },
  props: {
    text: { type: String, required: false },
    value: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    multiple: { type: Boolean, required: false, default: false },
    options: { type: Array, required: true, default: [] }
  },

  methods: {
    focus(e) {
      // const input = document.getElementById(`container_input_${this.text}`)
      // input.focus()
    },
    changeInput(e) {
      console.log(e)
      this.$emit('update:modelValue', e.id)
    }
  }
}
</script>

<style scoped>
.container_input {
  position: relative;
  cursor: text;
}
.input_label {
  text-transform: capitalize;
  text-align: start;
}

.fild_container_error {
  font-size: 0.5rem;
  color: red;
  text-align: start;
  margin-top: -0.7rem;
}

.vue-select {
  outline: 0;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: none;
  border-radius: 0.2rem;
  padding: 0.3rem;
  padding-bottom: 0;
  font-size: var(--font-family--text);
  margin: 0;
  cursor: pointer;
}

.vue-select-header {
  margin-top: 0.2rem;
}

.vue-dropdown-item.selected {
  background-color: var(--sidebar-green-ligth);
}

.vue-dropdown-item.highlighted {
  background-color: var(--sidebar-green-ligth);
}

.vue-dropdown-item.selected.highlighted {
  background-color: var(--sidebar-green-ligth);
}

.fild_container_icon_select {
  margin-top: -1rem;
}
</style>
