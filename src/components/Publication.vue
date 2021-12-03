<template>
  <div class="container__publication">
    <icon-base
      icon-name="icon"
      viewBox="0 0 500 500"
      width="97%"
      height="100%"
    >
      <icon-publicationP>
        <div class="publication__title">

          <Title> {{ title }} </Title>
          {{content}}
        </div>
      </icon-publicationP>
    </icon-base>
    <div class="publication_icon_button">
      <icon-base
        viewBox="0 0 1024 1024"
        icon-name="icon"
        class="folder_button"
        :onClick="onClick"
        width="20"
        height="20"
        :styles="onClick && 'cursor: pointer;'"
      >
        <icon-button />
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/svg/IconBase.vue'
import IconPublicationP from '@/components/svg/IconPublicationP.vue'
import IconButton from '@/components/svg/IconButton.vue'
import Title from '@/components/title/Title.vue'

export default {
  props: {
    title: { type: String, required: true },
    content: { type: String, required: true },
    onClick: { type: Function, required: false, default: null }
  },
  components: { IconBase, IconPublicationP, IconButton, Title }
}
</script>
<style scoped>
.container__publication {
  width: 70%;
  margin-left: auto;
  margin-right: 1.4rem;
  margin-bottom: -4rem;
  position: relative;
}

.publication__title {
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  text-align: left;
  padding-left: 3rem;
  width: 20rem;
  height: 12rem;
}

.publication_icon_button {
  position: absolute;
  bottom: 4.7rem;
  width: 80%;
}
</style>
