<template>
  <transition name="modal">
    <widget-modal v-if="showModal" layout="icon-modal-folder" :title="title">
      <template v-slot:body>
        <!-- <form action="#" @submit.prevent="$emit('submit')"> -->
        <form action="#">
          <slot />
        </form>
      </template>

      <template v-slot:footer>
        <div class="filter_button">
          <Send
            @click="$emit('submit', $event)"
            type="submit"
            width="100%"
            text="Enviar"
          />
        </div>
      </template>
    </widget-modal>
  </transition>
</template>
<script>
import WidgetModal from '@/components/widget/WidgetModal.vue'
import FormModalSend from '@/components/Filter.vue'
import Send from '@/components/button/Send.vue'

export default {
  components: {
    Send,
    WidgetModal,
    FormModalSend
  },
  props: {
    showModal: { type: Boolean, required: true },
    title: { type: String, required: true },
  }
}
</script>

<style scoped>
.filter_button {
  width: 5rem;
  margin-left: auto;
}
</style>
