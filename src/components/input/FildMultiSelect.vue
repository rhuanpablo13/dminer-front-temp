<template>
  <div class="container_input" @click="focus($event)">
    <div>
      <div v-if="text" class="input_label">
        {{ text }}
        <span v-if="required">*</span>
        :
      </div>
      <Multiselect
        v-model="config.value"
        v-bind="config"
        :options="options"
        @select="changeInput"
      >
        <template v-slot:tag="{ option, handleTagRemove, disabled }">
          <div class="multiselect-tag is-user">
            <img :src="option.image">
            {{ option.name }}
            <span
              v-if="!disabled"
              class="multiselect-tag-remove"
              @mousedown.prevent="handleTagRemove(option, $event)"
            >
              <span class="multiselect-tag-remove-icon"></span>
            </span>
          </div>
        </template>

        <template v-slot:option="{ option }">
          <img class="user-image" :src="option.image"> {{ option.name }}
        </template>
      </Multiselect>

      <div>
        <icon-base
          viewBox="0 0 500 58"
          width="100%"
          height="100%"
          :class="`fild_container_icon_select container_input_${text}`"
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

import Multiselect from '@vueform/multiselect'

import '@vueform/multiselect/themes/default.css'

export default {
  setup(props) {
    const config =  {
      mode: 'tags',
      value: [],
      placeholder: 'Selecione os usuários',
      closeOnSelect: false,
      search: true,
      trackBy: 'name',
      label: 'name',
      // options: [
      //   { value: 'judy', name: 'Judy', image: 'https://randomuser.me/api/portraits/med/women/1.jpg' },
      //   { value: 'jane', name: 'Jane', image: 'https://randomuser.me/api/portraits/med/women/2.jpg' },
      //   { value: 'john', name: 'John', image: 'https://randomuser.me/api/portraits/med/men/1.jpg' },
      //   { value: 'joe', name: 'Joe', image: 'https://randomuser.me/api/portraits/med/men/2.jpg' },
      // ]
    }

    return {
      config,
    }
  },

  computed: {
    isError() {
      const error = this.$store.state.form.isError && !this.value.length
      const circle = document.querySelector(
        `.container_input_${this.text} .icon__line > .st1`
      )

      if (circle)
        circle.style.fill = error ? 'red' : 'var( --sidebar-green-ligth)'

      return error
    }
  },
  components: { IconLine, IconBase, Multiselect },
  props: {
    text: { type: String, required: false },
    value: { type: Array, required: false },
    required: { type: Boolean, required: false, default: false },
    multiple: { type: Boolean, required: false, default: false },
    options: { type: Array, required: true, default: [] }
  },

  methods: {
    changeInput(e) {
       this.$emit('update:modelValue', this.config.value)
    }
  }
}
</script>

<style >
.container_input {
  position: relative;
  cursor: text;
}
.input_label {
  text-transform: capitalize;
  text-align: start;
  z-index: 3;
}

.fild_container_error {
  font-size: 0.5rem;
  color: red;
  text-align: start;
  margin-top: -0.7rem;
}

.multiselect-tag.is-user {
  padding: 5px 8px;
  border-radius: 22px;
  margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
  width: 1rem;
  border-radius: 50%;
  height: 1rem;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;;
}

.user-image {
  margin: 0 6px 0 0;
  border-radius: 50%;
  height: 22px;
}

.multiselect-tag {
  background: var( --sidebar-green-dark);
  color: var(--ms-tag-color,#fff);
  font-family: var(--font-family--text);
  font-size: 0.5rem;
  line-height: var(--ms-tag-line-height,1.25rem);
  font-weight: var(--ms-tag-font-weight,600);
  padding: var(--ms-tag-py,.125rem) 0 var(--ms-tag-py,.125rem) var(--ms-tag-px,.5rem);
  border-radius: var(--ms-tag-radius,4px);
  margin-right: var(--ms-tag-mx,.25rem);
  margin-bottom: var(--ms-tag-my,.25rem);
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.multiselect {
    position: relative;
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: transparent;
    border-radius: 0px;
    background: transparent;
    font-size: 0.6rem;
    color: var(--color-text);
    font-family: var(--font-family--text);
    min-height: calc(var(--ms-border-width, 1px)*2 + var(--ms-font-size, 1rem)*var(--ms-line-height, 1.375) + var(--ms-py, .5rem)*2);
}
.multiselect.is-active, .multiselect.is-open  {
  box-shadow: none;
      font-size: 0.3rem;

}

.multiselect-option.is-selected.is-pointed {
  background: var(--background-color);
  color: var( --color-text);
  font-size: 0.3rem;
}

.fild_container_icon_select {
  margin-top: -1rem;
}

</style>
