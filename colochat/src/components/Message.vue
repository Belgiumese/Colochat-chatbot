<template>
  <div 
    class="message" 
    :class="{ botText: isBot }">
    <div class="messageContainer">
      <p class="messageText">
        {{ messageData.text }}
      </p>
    </div>
  </div>
</template>

<script>
import SOURCES from '../services/Sources.js';

export default {
  name: 'Message',

  props: {
    messageData: {
      default: () => { },
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

    &.botText {
      text-align: left;

      .messageContainer {
        background-color: rgb(105, 37, 231);
      }
    }

    .messageContainer {
      display: inline-block;
      border-radius: 20px;
      padding: 8px 12px;
      max-width: 46%;
      margin: 7px 0;
      background-color: rgb(136, 129, 145);
      font-size: 16px;
      font-family: 'Open Sans', sans-serif;

      .messageText {
        color: white;
        text-align: left;
      }
    }
  }
</style>

