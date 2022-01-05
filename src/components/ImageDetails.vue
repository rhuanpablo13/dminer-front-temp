<template>
  <div :class="className">
    <div
      class="image_details_image"
      :style="{
        'background-image': `url(${image})`,
        width: imageW,
        height: imageH,
      }"
    ></div>
    <div class="image_details_content">
      <div class="image_details_texts">
        <h2>
          <slot name="title" />
        </h2>
        <div class="image_details_categorie" v-if="category">
          {{ category }}
        </div>
      </div>
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
    imageH: { type: String, required: false, default: '100%' },
    className: {  type: String, required: false, default: 'image_details_wrapper' }
  }
}
</script>

<style scoped>
.image_details_wrapper_grid {
  display: grid;
  padding: 0.5rem;
  word-wrap: break-word;
  margin: auto;
  justify-content: center;
  align-content: center;
}
.image_details_wrapper {
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem;
  word-wrap: break-word;
  margin-left: 2rem;
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
  max-width: 25rem;
  width: 100%;
}

.image_details_categorie {
  background: #aaff48;
  padding: 0.2rem;
  border-radius: 0.2rem;
  font-size: 0.4rem;
  height: 0.5rem;

  text-transform: uppercase;
}

h2 {
  font-family: var(--font-family--text);
  color: var(--color-text);
  font-weight: 300;

  text-transform: capitalize;

}

.image_details_texts{
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

@media only screen and (max-width: 1080px) {
  .icon__feed {
    width: 100%;
    position: initial;
  }
}
</style>
