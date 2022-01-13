<template>
  <button :disabled="disabled">
    <icon-base viewBox="0 0 500 500" height="100%">
      <component :is="layout"> </component>
    </icon-base>
    <Title>{{layout}}</Title>
    <span> {{ reacts }} </span>
  </button>
</template>

<script>
import Title from "@/components/title/Title.vue";
import IconBase from '@/components/svg/IconBase.vue'

import dterminado from '@/components/svg/IconDterminado.vue'
import dvertido from '@/components/svg/IconDvertido.vue'
import dmais from '@/components/svg/IconDmais.vue'
import dslumbrado from '@/components/svg/IconDslumbrado.vue'
import dsacreditado from '@/components/svg/IconSacreditado.vue'

export default {
    props: {
      layout: { type: String, required: true },
      reacts: { type: Number, required: false },
      disabled: { type: Boolean, required: false, default: false},
    },
    components: { 
      Title, 
      IconBase,
      "D-TERMINADO": dterminado,
      "D-MAIS": dmais,
      "D-SLUMBRADO": dslumbrado,
      "D-SACREDITADO": dsacreditado, 
      "D-IVERTIDO": dvertido,
    }
}
</script>

<style scoped>
  button {
    border: none;
    background: transparent;
    font-size: 0.3rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:disabled {
    cursor: not-allowed;
  }
</style>