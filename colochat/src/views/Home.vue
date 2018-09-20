<template>
  <div class="home">
    <meet-colo 
      v-if="showPopup" 
      @exit="closePopup"/>
    <chat-bot ref="chatBot"/>
    <colo-face/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatBot from '../components/ChatBot.vue';
import ColoFace from '../components/ColoFace.vue';
import MeetColo from '../components/MeetColo.vue';

export default {
  name: 'Home',
  components: {
    'chat-bot': ChatBot,
    'colo-face': ColoFace,
    'meet-colo': MeetColo
  },

  data() {
    return {
      userName: null,
      showPopup: false
    };
  },

  methods: {
    closePopup() {
      this.showPopup = false;
      this.$refs.chatBot.start();
    }
  },

  mounted() {
    this.userName = localStorage.getItem('name');
    if (!this.userName) {
      this.showPopup = true;
    } else {
      this.$refs.chatBot.start();
    }
  }
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

