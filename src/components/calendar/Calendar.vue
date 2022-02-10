<template>
  <date-picker v-model="date" trim-weeks is-expanded color="green" />
</template>

<script>
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css';

export default {
  data() {
    return {
      date: new Date()
    }
  },
  components: { DatePicker }
}
</script>

<style>
.vc-title {
  font-family: var(--font-family--title);
  font-weight: 300;
  font-size: 1.5rem;
}

.vc-container {
  border: none;
}

.vc-container.vc-is-expanded {
  min-width: 90%;
}
</style>
