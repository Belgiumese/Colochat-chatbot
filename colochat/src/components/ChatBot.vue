<template>
  <div class="chatBot">
    <message-box 
      :messages="messages" 
      ref="messageBox"
      :is-colo-typing="isColoTyping"
      @response-choice="responseChoice"/>
      
    <div id="typeBox">
      <input 
        type="text" 
        placeholder="Type a message..."
        v-model="inputText"
        @keyup.enter="submit">
      <button 
        @click="submit"
        :disabled="!isInputValid" 
      ><svgicon name="play-solid"/></button>
    </div>
  </div>
</template>

<script>
import DialogApi from '../services/DialogApi.js';
import SOURCE from '../services/Sources.js';
import MessageData from '../services/MessageData.js';
import MessageBox from './MessageBox';
import Util from '../services/Util.js';

import '../assets/icons-compiled/play-solid.js';

const COLO_TYPE_DELAY = 500;

const INITIAL_MESSAGE = {
  MESSAGE: ` it’s Colo!! 🐨🍃 You can chat to me here and ask me to translate or quiz you on body parts in a bunch of Aboriginal languages. 😮
  Also, don't forget to check out the HELP page if you get a little stuck. 😖`,
  MAX_DELAY: 2000,
  MIN_DELAY: 1000
};

export default {
  name: 'ChatBot',

  components: {
    'message-box': MessageBox
  },

  data() {
    return {
      inputText: '',
      messages: [],
      idCounter: 0,
      isColoTyping: true,
      initialMessageSent: false,
      initialMessageReceived: false,
      started: false
    };
  },

  computed: {
    isInputValid() {
      return this.inputText !== '';
    }
  },

  methods: {
    submit() {
      if (this.isInputValid) {
        const text = this.inputText;
        this.inputText = '';

        this.submitMessage(text);
      }
    },

    submitMessage(text) {
      // Add human message
      this.addHumanMessage(text);

      // Add artificial delay before typing
      const typingTimout = setTimeout(() => {
        this.isColoTyping = true;
        this.$refs.messageBox.scrollToBottom();
      }, this.getTypeDelay());

      // Submit for response, then add it
      DialogApi.getResponse(text).then(response => {
        // Stop typing
        clearTimeout(typingTimout);

        // Add response to the screen
        this.addAgentMessage(response);
      });
    },

    addHumanMessage(text) {
      const messageData = MessageData({
        source: SOURCE.SOURCE_HUMAN,
        text: text,
        id: this.idCounter++
      });

      this.addMessage(messageData);
    },

    addAgentMessage(agentResponses) {
      // Stop the typing animation
      this.isColoTyping = false;

      // Add the messages to the screen
      for (let i = 0; i < agentResponses.length; i++) {
        this.addMessage(agentResponses[i]);
      }
    },

    addMessage(messageData) {
      // Add message to the screen
      this.messages.push(messageData);
      // Update the scroll position
      this.$refs.messageBox.scrollToBottom();
    },

    sendFakeInitialMessage() {
      if (!this.initialMessageSent) {
        this.initialMessageSent = true;
        this.isColoTyping = false;

        // Check if they have a name listed
        let message;
        const name = localStorage.getItem('name');
        if (name) {
          message = `Hey ${name},` + INITIAL_MESSAGE.MESSAGE;
        } else {
          message = 'Hey,' + INITIAL_MESSAGE.MESSAGE;
        }

        const messageData = MessageData({
          source: SOURCE.SOURCE_AGENT,
          text: message,
          id: this.idCounter++
        });

        this.addMessage(messageData);
      }
    },

    scrollToBottomImmediate() {
      this.$refs.messageBox.scrollToBottomImmediate();
    },

    getTypeDelay() {
      return COLO_TYPE_DELAY + Util.getRandomNum(-100, 100);
    },

    responseChoice(choice) {
      this.submitMessage(choice);
    },

    start() {
      console.log('started');
      this.started = true;
      if (this.initialMessageReceived) {
        setTimeout(this.sendFakeInitialMessage, INITIAL_MESSAGE.MIN_DELAY);
      } else {
        setTimeout(this.sendFakeInitialMessage, INITIAL_MESSAGE.MAX_DELAY);
      }
    }
  },
  
  watch: {
    '$route' () {
      this.scrollToBottomImmediate();
    }
  },

  created() {
    DialogApi.getResponse('who are you')
      .then(() => {
        // Can't show it until user has closed intro message
        if (this.started) {
          this.sendFakeInitialMessage();
        } else {
          this.initialMessageReceived = true;
        }
      });
  }
};
</script>

<style lang="scss" scoped>
$accent2: rgb(241, 87, 138);
$bgGrey: rgb(248, 249, 250);

$arrowHeight: 30px;
$arrowWidth: 40px;

.chatBot {
  width: 100vw;
  background-color: $bgGrey;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: -$arrowWidth;
    top: 30%;
    width: 0;
    height: 0;
    border-top: $arrowHeight solid transparent;
    border-bottom: $arrowHeight solid transparent;
    border-left: $arrowWidth solid $bgGrey;
  }

  #typeBox {
    box-sizing: border-box;
    border-top: 2px solid #958781;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      padding: 12px 20px;
      border-radius: 4px;
      margin-left: 35px;
      border: none;
      font-size: 1.1em;
      width: 80%;
      background-color: $bgGrey;
    }

    button {
      font-size: 1.5em;
      padding: 10px;
      margin: 0 auto;
      border-radius: 2em;
      background-color: $accent2;
      border: none;
      color: white;
      transition: background-color 0.15s ease-out;

      &:hover {
        cursor: pointer;
        background-color: rgb(216, 47, 103);
      }

      svg {
        display: block;
        margin: auto;
        width: 20px;
        height: 20px;
        padding-left: 3px;
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .chatBot {
    display: flex;
    flex-direction: column;
    height: 100%;

    &::after {
      display: none;
    }

    .messageBox {
      flex: 1;
    }

    #typebox {
      position: sticky !important;
      bottom: 0;
    }
  }
}

@media only screen and (min-width: 1001px) {
  .chatBot {
    margin: 30px 10px;
    border-radius: 10px;
    margin-right: $arrowHeight;
    width: 600px;

    #typeBox {
      position: relative;
    }
  }
}
</style>
