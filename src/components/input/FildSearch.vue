<template>
  <icon-base
    icon-name="icon"
    viewBox="0 0 500 56.4"
    width="85%"
    height="100%"
    class="input__date"
  >
    <input-search>
      <div class="container__provisorio">
        <input
          :value="value"
          @change="$emit('update:modelValue', $event.target.value)"
        />
      </div>
    </input-search>
  </icon-base>
</template>

<script>
import { dateNowFormart } from '@/util/date.js'
import InputSearch from '@/components/svg/InputSearch.vue'
import IconBase from '@/components/svg/IconBase.vue'

export default {
  components: { InputSearch, IconBase },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      date: dateNowFormart()
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>

<style scoped>
.container__provisorio {
  display: grid;
  grid-template-columns: 1fr 110px;
  gap: 8rem;
}
input {
  width: 100%;
  border: none;
  background: transparent;
  margin: auto;
  margin-left: 3rem;
  font-family: var(--font-family--text);
  color: var(--color-title);
  font-weight: 300;
  font-size: 0.5rem;
  margin-top: 0.9rem;
}

</style>
