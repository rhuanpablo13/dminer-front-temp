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
          v-model="input"
          placeholder="PESQUISAR"
          @keyup.enter="$emit('change')"
        />
        <!-- v-if="input.length" -->
        <span class="clear" @click="clear" >X</span>
      </div>
    </input-search>
  </icon-base>
</template>

<script>
import InputSearch from '@/components/svg/InputSearch.vue'
import IconBase from '@/components/svg/IconBase.vue'

export default {
  data () {
    return {
      input: ''
    }
  },
  created() {
    this.input = this.value || ''
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    clear(){
      this.input = ''
      this.$emit('clear')
    }
  },
  components: { InputSearch, IconBase },
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

.clear {
  font-family: var(--font-family--title);
  color: var(--color-title);
  font-weight: 300;
  cursor: pointer;
  margin-top: 1rem;

  transition: all 05s ease;
}

.clear:hover {
  transform: scale(0.9);
}

</style>
