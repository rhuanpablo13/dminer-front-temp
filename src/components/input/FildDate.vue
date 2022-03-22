<template>
  <div class="container_input" @click="focus($event)">
    <div>
      <div v-if="text" class="input_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>

      <Datepicker
        :id="`container_input_${text}`"
        class="input_form"
        @update:modelValue="changeInput"
        v-model="value"
        placeholder="Selecione a data"
        locale="pt-BR"
        inputFormat="dd-MM-yyyy"
        selectText="selecionar"
        cancelText="cancelar"
        :format="format"
        :previewFormat="format"
        :minDate="minDate"
        :enableTimePicker="enableTimePicker"
      ></Datepicker>

      <div>
        <icon-base
          viewBox="0 0 500 58"
          width="100%"
          height="100%"
          class="fild_container_icon_date"
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
import { ref } from 'vue'
import IconBase from '@/components/svg/IconBase.vue'
import IconLine from '@/components/svg/IconLine.vue'

import { dateFormart } from '@/util/date'

import Datepicker from 'vue3-date-time-picker'
import 'vue3-date-time-picker/dist/main.css'

export default {
  props: {
    text: { type: String, required: false },
    value: { type: String, required: false },
    minDate: { type: String, required: false },
    required: { type: Boolean, required: false, default: false },
    format: { type: Function, required: false, default: dateFormart },
    enableTimePicker: { type: Boolean, required: false, default: false }
  },

  setup(props) {
    const date = ref([])
    date.value = new Date(props.value) || new Date()

    return {
      date,
      dateFormart
    }
  },
  computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value && this.required
      const circle = document.querySelector(
        `.container_input_${this.text} .icon__line > .st1`
      )

      if (circle)
        circle.style.fill = error ? 'red' : 'var( --sidebar-green-ligth)'

      return error
    }
  },
  components: { IconLine, IconBase, Datepicker },

  methods: {
    setMindate(date) {
      if (!date) return new Date();

      const _date = new Date(date)
      const day = _date.getDay() -1
      const month = _date.getMonth() + 1
      const year = _date.getFullYear()

      const new_date = new Date(`${month}-${day}-${year}`)

      return new_date
    },
    focus(e) {
      const input = document.getElementById(`container_input_${this.text}`)
      input.focus()
    },
    changeInput(e) {
      this.$emit('update:modelValue', e)
    }
  }
}
</script>

<style>
.container_input {
  /* display: grid;
  grid-template-areas:
    'label input input input input'
    'icon icon icon icon icon'; */
  /* width: 100%;
  text-overflow: ellipsis;
  z-index: 1;
  grid-template-columns: 25% auto; */
  position: relative;
  cursor: text;
}

.input_label {
  text-transform: capitalize;
  text-align: start;
}

.fild_container_icon_date {
  /* position: absolute;
  bottom: 0;
  left: 0;
  /* width: fit-content;

  grid-area: icon;
  transform: rotateY(180deg); */

  transform: rotateY(180deg);
  margin-top: -30px;
  z-index: 3;
}

.dp__main {
  font-family: var(--font-family--text);
  user-select: none;
  box-sizing: border-box;
}

.input_form {
  border: none;
  outline: none;
  transition: none;
  width: 100%;
  line-height: 0.5rem;
  color: var(--dp-text-color);
  box-sizing: border-box;
  text-overflow: ellipsis;
  z-index: 4;
  padding: 0;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}

.fild_container_error {
  font-size: 0.5rem;
  color: red;
  text-align: start;
  margin-top: -0.7rem;
}

.dp__input_icons {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  stroke-width: 0;
  line-height: 1.5rem;
  padding: 6px 0;
  color: var(--dp-text-color);
  box-sizing: content-box;
}

.dp__input {
  background-color: transparent;
  border: none;
  border-radius: 0;
  outline: none;
  transition: none;
  width: 100%;
  font-size: 0.6rem;
  line-height: 0.5rem;
  padding: 5px 10px;
  color: var(--dp-text-color);
  box-sizing: border-box;
  text-overflow: ellipsis;
}

.dp__input_icons {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  stroke-width: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 6px 0;
  /* padding: 6px 4px; */
  color: #231f20;
  box-sizing: content-box;
}
</style>
