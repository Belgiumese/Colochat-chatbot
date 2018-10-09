<template>
  <div 
    class="messageBox" 
    ref="messageBox">
    <!-- Array of messages to show -->
    <transition-group name="messages">
      <message 
        v-for="(message, i) in messages" 
        :message-data="message"
        :is-last-message="i === (messages.length - 1)"
        :key="message.id"
        @response-choice="$emit('response-choice', $event)"/>
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

import TWEEN from '@tweenjs/tween.js';
import PerfectScrollBar from 'perfect-scrollbar';
import '../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css';

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

  data() {
    return {
      scrollBar: null,
      scrollAnimateCount: 0
    };
  },

  methods: {
    scrollToBottom() {
      const mBox = this.$refs.messageBox;

      Vue.nextTick(() => {
        this.addOrRemoveScrollbar();

        const newScroll = mBox.scrollHeight - mBox.clientHeight;

        if (newScroll > mBox.scrollTop) {
          let scrollPos = { pos: mBox.scrollTop };

          this.scrollAnimateCount++;
          requestAnimationFrame(this.animate);

          new TWEEN.Tween(scrollPos)
            .to({ pos: newScroll }, 100)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
              mBox.scrollTop = scrollPos.pos;
            })
            .onComplete(() => this.scrollAnimateCount--)
            .start();
        }
      });
    },

    scrollToBottomImmediate() {
      const mBox = this.$refs.messageBox;
      mBox.scrollTop =  mBox.scrollHeight - mBox.clientHeight;
    },

    addOrRemoveScrollbar() {
      this.scrollBar.update();
    },

    animate(time) {
      TWEEN.update(time);
      if (this.scrollAnimateCount) {
        requestAnimationFrame(this.animate);
      }
    }
  },

  mounted() {
    this.scrollBar = new PerfectScrollBar(this.$refs.messageBox);
  }
};
</script>


<style lang="scss" scoped>
.messageBox {
  margin: 0 auto;
  padding: 15px;
  overflow-y: auto;
  position: relative;
}

@media only screen and (max-width: 1000px) {
  .messageBox {
    height: calc((100vh - 40px) * 0.9);
  }
}

@media only screen and (min-width: 1001px) {
  .messageBox {
    width: 600px;
    height: 550px;
  }
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

<style lang="scss">
.ps__rail-y {
  .ps__thumb-y {
    width: 9px;
  }

  &:hover,
  &.ps--clicking {
    .ps__thumb-y {
      width: 12px;
    }
  }
}
</style>

