<template>
  <div 
    class="messageBox" 
    ref="messageBox">
    <!-- Array of messages to show -->
    <transition-group name="messages">
      <message 
        v-for="message in messages" 
        :message-data="message"
        :key="message.id"/>
    </transition-group>

    <!-- The Colo is typing icon -->
    <div 
      class="coloTyping" 
      v-show="isColoTyping">

      <div class="messageContainer">
        <div class="typingAnim">
          <div class="typingBall typingBall1"/>
          <div class="typingBall typingBall2"/>
          <div class="typingBall typingBall3"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Message from './Message';

export default {
  name: 'MessageBox',

  components: {
    message: Message
  },

  props: {
    messages: {
      default: () => [],
      type: Array
    },
    isColoTyping: {
      default: false,
      type: Boolean
    }
  },

  methods: {
    scrollToBottom() {
      const mBox = this.$refs.messageBox;

      Vue.nextTick(() => {
        const newScroll = mBox.scrollHeight - mBox.clientHeight;

        if (newScroll > mBox.scrollTop) {
          this.$(mBox).animate(
            {
              scrollTop: newScroll
            },
            100
          );
        }
      });
    },

    scrollToBottomImmediate() {
      const mBox = this.$refs.messageBox;
      mBox.scrollTop =  mBox.scrollHeight - mBox.clientHeight;
    }
  }
};
</script>


<style lang="scss" scoped>
.messageBox {
  width: 600px;
  height: 550px;
  margin: 0 auto;
  padding: 15px;
  overflow-y: auto;
  position: relative;
}

.messages-enter-active,
.messages-leave-active {
  transition: all 0.15s ease-out;
}

.messages-enter {
  transform: translateY(5px);
  opacity: 0;
}

.coloTyping {
  $ballSize: 12px;

  text-align: left;

  .messageContainer {
    display: inline-block;
    background-color: rgb(241, 87, 138);
    border-radius: 20px;
    padding: 8px 10px;
    margin: 7px 0;

    .typingAnim {
      color: white;

      .typingBall {
        text-align: center;
        width: $ballSize;
        height: $ballSize;
        background-color: white;
        border-radius: 100%;
        display: inline-block;
        animation: typingAnim 1.4s ease-in-out 0s infinite both;
        margin: 0 2px;
      }

      .typingBall1 {
        animation-delay: -0.32s;
      }

      .typingBall2 {
        animation-delay: -0.16s;
      }
    }
  }

  @keyframes typingAnim {
    0%,
    80%,
    100% {
      transform: scale(0);
    }

    40% {
      transform: scale(1);
    }
  }
}
</style>
