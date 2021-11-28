<template>
  <div class="image_details_wrapper">
    <div
      class="image_details_image"
      :style="{
        'background-image': `url(${image})`,
        width: imageW,
        height: imageH
      }"
    ></div>
    <div class="image_details_content">
      <h2>
        <slot name="title" />
        <div class="image_details_categorie" v-if="category">
          {{ category }}
        </div>
      </h2>
      <span><slot name="content" /></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, required: true },
    category: { type: String, required: false, default: '' },
    imageW: { type: String, required: false, default: '100%' },
    imageH: { type: String, required: false, default: '100%' }
  }
}
</script>

<style scoped>
.image_details_wrapper {
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem;
  word-wrap: break-word;
}

.image_details_image {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.image_details_content {
  display: grid;
  text-align: left;
  word-break: break-word;
  font-size: 0.5rem;
  text-overflow: ellipsis;
  padding: 0rem 1rem;
}

.image_details_categorie {
  position: absolute;
  top: 0;
  right: 0;
  background: #aaff48;
  padding: 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.4rem;

  text-transform: uppercase;
}

h2 {
  font-family: var(--font-family--text);
  color: var(--color-text);
  font-weight: 300;

  text-transform: capitalize;
  position: relative;
}

@media only screen and (max-width: 1080px) {
  .icon__feed {
    width: 100%;
    position: initial;
  }
}
</style>
