<template>
  <div
    class="container"
    :style="{
      'margin-left': sidebarWidth
    }"
  >
    <div class="container_text" @click="selectImage">
      <Title v-if="!previewImage">Banner (espaço para upload)</Title>
    </div>
    <div
      v-if="previewImage || isLoading"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>
    <input ref="fileInput" type="file" @input="pickFile" class="imageInput" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Title from '@/components/title/Title.vue'

export default {
  props: {
    isLoading: { type: Boolean, required: false, default: false}
  },
  data() {
    return {
      previewImage: this.$store.state.user.banner,
      update: true
    }
  },
  setup() {
    const fileInput = ref([])

    return { fileInput }
  },
  updated() {
    if (this.isLoading && this.update) {
      this.previewImage =  this.$store.state.user.banner
    }
  },
  computed: {
    sidebarWidth() {
      return this.$store.state.sidebar.sidebarWidth
    },
    banner() {
      this.previewImage =  this.$store.state.user.banner
    }
  },

  methods: {
    selectImage() {
      this.update = false
      this.fileInput.click()
    },
    pickFile() {
      let input = this.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
          this.$store.dispatch('user/updateBanner', reader.result)
        }
        reader.readAsDataURL(file[0])
      }
    }
  },
  components: { Title }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-color: #60645c6e;
  position: fixed;
  top: 0;
  height: 5rem;
  transition: 0.2s linear;
}

.imagePreviewWrapper {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
  position: absolute;
  top: 0;
}

.imageInput {
  display: none;
}

.container_text {
  text-align: start;
  margin-left: 5rem;
  cursor: pointer;
}
</style>
