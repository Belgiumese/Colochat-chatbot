<template>
  <div class="animation">
    <iframe 
      v-if="src !== ''"
      width="600" 
      height="480" 
      :src="src"/>
  </div>
</template>

<script>
export default {
  name: 'Animation',
  props: {
    src: {
      default: '',
      type: String
    },
  }
};
</script>

<style lang="scss" scoped>
.animation {
  iframe {
    overflow: hidden;
  }
}
</style>

