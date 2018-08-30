<template>
  <div class="messageBox">
    <message 
      v-for="message in messages" 
      :message-data="message"
      :key="message.id"/>
  </div>
</template>

<script>
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
  }
};
</script>


<style lang="scss" scoped>
.messageBox {
  width: 500px;
  height: 600px;
  background-color: rgb(236, 243, 250);
  margin: 20px auto;
}
</style>
