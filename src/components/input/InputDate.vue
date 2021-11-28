<template>
  <icon-base
    icon-name="icon"
    viewBox="0 0 500 50"
    width="85%"
    height="100%"
    class="input__date"
  >
    <icon-input-date>
      <div class="container__provisorio">
        <input
          :value="value"
          @change="$emit('update:modelValue', $event.target.value)"
        />

        <div class="container__date">
          <span>{{ date }}</span>
        </div>
      </div>
    </icon-input-date>
  </icon-base>
</template>

<script>
import { dateNowFormart } from '@/util/date.js'
import IconInputDate from '@/components/svg/IconInputDate.vue'
import IconBase from '@/components/svg/IconBase.vue'

export default {
  components: { IconInputDate, IconBase },
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
  margin-left: 1rem;
  font-family: var(--font-family--text);
  color: var(--color-title);
  font-weight: 300;
  font-size: 0.8rem;
  margin-top: 0.8rem;
}

.input__date {
  margin-left: -4rem;
}
.container__date {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  font-size: 0.7rem;
  padding-top: 1.3rem;
}

@media only screen and (max-width: 1080px) {
  .input__date {
    width: 100%;
    margin-left: 0;
  }
}
</style>
