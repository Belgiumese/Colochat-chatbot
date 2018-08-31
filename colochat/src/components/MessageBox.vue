<template>
  <div 
    class="messageBox" 
    ref="messageBox">
    <transition-group name="messages">
      <message 
        v-for="message in messages" 
        :message-data="message"
        :key="message.id"/>
    </transition-group>
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
    }
  },

  methods: {
    scrollToBottom() {
      const mBox = this.$refs.messageBox;

      Vue.nextTick(() => {
        const newScroll = mBox.scrollHeight - mBox.clientHeight;
        console.log(newScroll);
        console.log(mBox.scrollTop);
        if (newScroll > mBox.scrollTop) {
          this.$(mBox).animate({
            scrollTop: newScroll
          }, 100);
        }
        //mBox.scrollTop = mBox.scrollHeight;
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.messageBox {
  width: 600px;
  height: 600px;
  background-color: rgb(236, 243, 250);
  margin: 20px auto;
  padding: 15px;
  overflow-y: auto;
}

.messages-enter-active, .messages-leave-active {
  transition: all 0.15s ease-out;
}

.messages-enter {
  transform: translateY(5px);
  opacity: 0;
}
</style>
