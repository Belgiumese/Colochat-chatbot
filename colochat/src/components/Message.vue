<template>
  <div 
    class="message" 
    :class="{ left: isBot }">
    <div class="messageContainer">
      <p 
        class="messageText" 
      >{{ messageData.text }}</p>
    </div>
  </div>
</template>

<script>
import SOURCES from '../services/Sources.js';

export default {
  name: 'Message',

  props: {
    messageData: {
      default: () => {},
      type: Object
    }
  },

  computed: {
    isBot() {
      return this.messageData.source === SOURCES.SOURCE_AGENT;
    }
  }
};
</script>

<style lang="scss" scoped>
  .message {
    text-align: right;

    &.left {
      text-align: left;
    }

    .messageContainer {
      display: inline-block;
      border-radius: 10px;
      padding: 5px;
      max-width: 60%;
      margin: 20px;


      .messageText {
        display: inline-block;
      }
    }
  }
</style>

