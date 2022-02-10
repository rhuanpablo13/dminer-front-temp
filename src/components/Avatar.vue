<template>
  <div>
    <div
      class="hex"
      :style="{
        'background-image': `url(${
          previewImage ||'../src/assets/widget/avatar.svg'
        })`,
        width: width,
        height: height
      }"
    ></div>
    <div class="username">
      <h2>{{ username }}</h2>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return { isLoading: true, previewImage: null }
  },
  updated() {
    this.isLoading = true
    this.previewImage = this.avatar
  },
  props: {
    avatar: {
      type: String,
      required: true,
      default:'../src/assets/widget/avatar.svg'
    },
    username: { type: String, required: false, default: '' },
    width: { type: String, required: false, default: '8rem' },
    height: { type: String, required: false, default: '9rem' }
  },
  setup(props) {
    const previewImage = ref(props.avatar)

    return { previewImage }
  }
}
</script>

<style scoped>
.hex {
  display: flex;
  justify-content: center;
  position: relative;

  min-width: 2rem;
  min-height: 2rem;

  background-color: transparent;
  -webkit-clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);

  background-size: cover;
  background-position: center;
  background-repeat: repeat;
}

.imageInput {
  display: none;
}

.username {
  width: 90%;
}

h2 {
  font-family: var(--font-family--title);
  color: black;
  font-weight: 300;
  text-transform: uppercase;
  /* margin-left: -2rem; */
}
</style>
