<template>
  <div class="home">
    <meet-colo 
      v-if="showPopup" 
      @exit="closePopup"/>
    <chat-bot ref="chatBot"/>
    <div class="faceContainer">
      <div class="faceCircle"/>
      <colo-face class="coloFace"/>
    </div>
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

  .faceContainer {
    position: relative;
    z-index: 1;
    margin-left: 10px;

    .faceCircle {
      $size: 390px;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -45%);
      z-index: 0;
      width: $size;
      height: $size;
      border-radius: 100%;
      background-color: #6e4e45;
    }

    .coloFace {
      position: relative;
      z-index: 2;
    }
  }

  @media only screen and (max-width: 1000px) {
    .coloFace {
      display: none;
    }
  }
}
</style>

