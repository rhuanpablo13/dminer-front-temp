<template>
  <div class="container_input" @click="changeInput">
    <div class="input_text" :title="text">
      <input
        :id="`container_input_${text}`"
        class="input_form"
        :type="type"
        @change="changeInput"
        :required="required"
        v-model="value"
      />
      <div v-if="text" class="input_label" :style="{'max-width': full ? '100%': '20rem'}">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: false },
    value: { type: Boolean, required: false },
    full: { type: Boolean, required: false },
    required: { type: Boolean, required: false, default: false },
    isError: { type: Boolean, required: false, default: false },
    type: { type: String, required: false, default: 'text' }
  },
  created() {
    console.log(this.value);
    },
  methods: {
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
  z-index: 2;
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
  width: 1rem;
  height: 1rem;
  top: 0;
  left: 0;
  border: 1px solid #555555;
  border-radius: 3px;
  background-color: white;
}
input[type='checkbox']:checked:after {
  content: '';
  display: block;
  width: 0.5rem;
  height: 0.7rem;
  border: solid var(--sidebar-green-ligth);

  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: -1px;
  left: 4px;
}
</style>
