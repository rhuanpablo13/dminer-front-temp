<template>
  <div @click="()=> this.$store.dispatch('post/getFavorite')">
    <icon-base
      style="cursor: pointer;"
      icon-name="icon"
      viewBox="0 0 500 500"
      width="10rem"
      height="10rem"
      
    >
      <icon-button-favorite />
    </icon-base>
  </div>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import IconButtonFavorite from '@/components/svg/IconButtonFavorite.vue'

export default {
  components: {
    IconBase,
    IconButtonFavorite,
  }
}
</script>

