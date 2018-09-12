<template>
  <div class="hello">
    <message-box 
      :messages="messages" 
      ref="messageBox"
      :is-colo-typing="isColoTyping"/>
    <div id="typeBox">
      <input 
        type="text" 
        placeholder="Type a message..."
        v-model="inputText"
        @keyup.enter="submit">
      <button 
        @click="submit"
        :disabled="!isInputValid" 
      >▶</button>
    </div>
  </div>
</template>

<script>
import DialogApi from '../services/DialogApi.js';
import SOURCE from '../services/Sources.js';
import MessageData from '../services/MessageData.js';
import MessageBox from './MessageBox';
import Util from '../services/Util.js';

const COLO_TYPE_DELAY = 500;

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
      isColoTyping: true
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
      }
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

    getTypeDelay() {
      return COLO_TYPE_DELAY + Util.getRandomNum(-100, 100);
    }
  },

  created() {
    // Get Colo to start the conversation by sending a hidden message
    DialogApi.getResponse('who are you').then(this.addAgentMessage);
  }
};
</script>

<style lang="scss" scoped>
$accent2: rgb(241, 87, 138);
$bgGrey: rgb(248, 249, 250);

.hello {
  margin: 30px 10px;
  width: 600px;
  border-radius: 10px;
  background-color: $bgGrey;

  #typeBox {
    border-top: 2px solid grey;
    padding: 5px;

    input {
      padding: 12px 20px;
      border-radius: 4px;
      border: none;
      font-size: 1.1em;
      width: 80%;
      background-color: $bgGrey;
    }

    button {
      font-size: 1.5em;
      padding: 5px 10px;
      border-radius: 2em;
      background-color: $accent2;
      border: none;
      color: white;
    }
  }
}
</style>
