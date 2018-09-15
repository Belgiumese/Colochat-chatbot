<template>
  <div class="home">
    <!-- For now, this page only contains the chatbot component -->
    <chat-bot ref="chatBot"/>
    <colo-face/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatBot from '../components/ChatBot.vue';
import ColoFace from '../components/ColoFace.vue';

export default {
  name: 'Home',
  components: {
    'chat-bot': ChatBot,
    'colo-face': ColoFace
  }
  // afterRouteEnter() {
  //   console.log('mounted!!');
  //   this.$refs.ChatBot.scrollToBottom();
  // }
};
</script>

<style lang="scss" scoped>
$accent: hsl(340, 100%, 79%);

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
  background-image: url("../assets/bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

