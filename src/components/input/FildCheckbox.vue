<template>
  <div class="container_input" @click="focus($event)">
    <div class="input_text" :title="text">
      <input
        :id="`container_input_${text}`"
        class="input_form"
        :type="type"
        @change="changeInput"
        :required="required"
        :value="value"
      />
      <div v-if="text" class="input_label">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: false },
    value: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    isError: { type: Boolean, required: false, default: false },
    type: { type: String, required: false, default: 'text' }
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
  display: grid;
  align-items: center;
  height: 100%;
}

.input_text {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.input_label {
  text-transform: capitalize;
  text-align: start;
  width: 20rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.input_form {
  /* background-color: red; */
  border: none;
  /* border-bottom: 1px solid #231f20; */
  outline: none;
  transition: none;
  width: 1rem;
  font-size: 0.4rem;
  line-height: 0.5rem;
  color: var(--sidebar-green-ligth);
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

input[type='checkbox'] {
  position: relative;
  cursor: pointer;
}

input[type='checkbox']:before {
  content: '';
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  border: 2px solid #555555;
  border-radius: 3px;
  background-color: white;
}
input[type='checkbox']:checked:after {
  content: '';
  display: block;
  width: 5px;
  height: 10px;
  border: solid var(--sidebar-green-ligth);

  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 6px;
}
</style>
