<template>
  <div class="home">

    <meet-colo 
      v-if="showPopup" 
      @exit="closePopup"/>

    <chat-bot ref="chatBot"/>
    <div class="coloSuggestions">
      <div class="faceContainer hideOnMobile">
        <div class="faceCircle"/>
        <colo-face class="coloFace"/>
      </div>

      <div class="suggestions">
        <h3>Not sure what to say? Try:</h3>
        <div 
          @click="suggestionClick" 
          class="suggestOptions"
          ref="suggestionList">
          <button>What is the word for arm in Turubal?</button>
          <button>Tell me a joke!</button>
          <button>Can you give me a quiz in wakka-wakka?</button>
        </div>
      </div>
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
    },

    suggestionClick(event) {
      const elem = event.srcElement;
      if (elem.parentNode == this.$refs.suggestionList) {
        // This is a child and not the element itself
        console.log(elem.innerText);
        this.$refs.chatBot.submitMessage(elem.innerText);
      }
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
  min-height: calc(100vh - 40px);
  background-image: url("../assets/bg.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .coloSuggestions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .suggestions {
      width: 360px;
      background-color: #f8f9fa;
      border-radius: 10px;
      padding: 18px;
      margin-top: 10px;

      h3 {
        margin-bottom: 10px;
      }

      .suggestOptions button {
        background-color: white;
        padding: 7px 10px;
        margin: 5px auto;
        border: 1px solid grey;
        border-radius: 15px;
        font-size: 16px;
        outline: none;
        transition: background-color 0.15s ease;

        &:hover {
          cursor: pointer;
          background-color: rgb(232, 233, 238);
        }
      }
    }

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

  @media only screen and (max-width: 1000px) {
    .hideOnMobile {
      display: none;
    }
  }
}
</style>

