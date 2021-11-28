<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    :width="width"
    :height="height"
    :aria-labelledby="iconName"
    role="presentation"
    :viewBox="viewBox"
    :style="styles"
    xml:space="preserve"
    :onclick="onClick"
    :class="classe"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 40
    },
    height: {
      type: [Number, String],
      default: 40
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    viewBox: {
      type: String,
      default: '0 0 512 512'
    },
    onClick: { type: Function, required: false },
    classe: { type: String, required: false },
    styles: {
      type: String || Object,
      required: false
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
  z-index: 3;
}

:not(svg) {
  transform-origin: 100px 100px !important;
}
</style>
