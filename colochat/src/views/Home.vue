<template>
  <div class="home">

    <meet-colo 
      v-if="state === STATES.POPUP" 
      @exit="closePopup"/>

    <div 
      class="mainContent" 
      v-show="state === STATES.CHAT">

      <chat-bot ref="chatBot"/>
      <div class="coloSuggestions">
        <div class="faceContainer hideOnMobile">
          <div class="faceCircle"/>
          <colo-face class="coloFace"/>
        </div>

        <suggestions 
          @clicked="suggestionClick" 
          class="hideOnMobile"/>
      </div>

      <reset-btn 
        v-if="this.userName"
        @click="resetUser" 
        class="reset"/>
    </div>
  </div>
</template>

<script>
import ChatBot from '../components/ChatBot.vue';
import ColoFace from '../components/ColoFace.vue';
import MeetColo from '../components/MeetColo.vue';
import Suggestions from '../components/Suggestions.vue';
import Animation from '../components/Animation.vue';
import ResetBtn from '../components/ResetBtn.vue';

export default {
  name: 'Home',

  components: {
    'chat-bot': ChatBot,
    'colo-face': ColoFace,
    'meet-colo': MeetColo,
    'suggestions': Suggestions,
    'animation': Animation,
    'reset-btn': ResetBtn
  },

  data() {
    return {
      STATES: {
        LOADING: 0,
        POPUP: 1,
        CHAT: 2
      },

      userName: null,
      state: 0,
      iframeLink: './sleeping/sleeping.html'
    };
  },

  methods: {
    closePopup() {
      this.state = this.STATES.CHAT;
      this.$refs.chatBot.start();
    },

    suggestionClick(text) {
      this.$refs.chatBot.submitMessage(text);
    },

    resetUser() {
      localStorage.removeItem('name');
      window.location.reload();
    }
  },

  mounted() {
    this.userName = localStorage.getItem('name');
    if (!this.userName) {
      this.state = this.STATES.POPUP;
    } else {
      this.state = this.STATES.CHAT;
      this.$refs.chatBot.start();
    }
  }
};
</script>

<style lang="scss" scoped>
$accent: hsl(340, 100%, 79%);

.home {
  max-height: calc(100vh - 40px);
  background-image: url("../assets/bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: stretch;

  .mainContent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    .coloSuggestions {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .faceContainer {
        position: relative;
        z-index: 1;
        margin-left: 10px;
        margin-bottom: 60px;

        .faceCircle {
          $size: 320px;

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
          width: 330px !important;
          height: 250px !important;
        }
      }
    }

    .reset {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }

  @media only screen and (max-width: 1000px) {
    .hideOnMobile {
      display: none;
    }
  }
}
</style>

