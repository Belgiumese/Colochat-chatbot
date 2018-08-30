<template>
  <div class="messageBox">
    <message v-for="message in messages"/>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',

  props: {
    messages: {
      default: () => [],
      type: Array
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
