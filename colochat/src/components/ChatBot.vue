<template>
  <div class="hello">
    <message-box 
      :messages="messages" 
      ref="messageBox"/>
    <input 
      type="text" 
      v-model="inputText"
      @keyup.enter="submit">
    <button 
      @click="submit"
      :disabled="!isInputValid" 
    >Submit</button>
  </div>
</template>

<script>
import DialogApi from '../services/DialogApi.js';
import SOURCE from '../services/Sources.js';
import MessageData from '../services/MessageData.js';
import MessageBox from './MessageBox';

export default {
  name: 'ChatBot',

  components: {
    'message-box': MessageBox
  },

  data() {
    return {
      inputText: '',
      messages: [],
      idCounter: 0
    };
  },

  computed: {
    isInputValid() {
      return this.inputText !== '';
    },
  },

  methods: {
    submit() {
      if (this.isInputValid) {
        const text = this.inputText;
        this.inputText = '';
        // Add human message
        this.addHumanMessage(text);
        // Submit for response, then add it
        DialogApi.getResponse(text).then(this.addAgentMessage);
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
      for (let i = 0; i < agentResponses.length; i++) {
        this.addMessage(agentResponses[i]);
      }
    },

    addMessage(messageData) {
      // Add message to the screen
      this.messages.push(messageData);
      // Update the scroll position
      this.$refs.messageBox.scrollToBottom();
    }
  },

  created() {
    // Get Colo to start the conversation by sending a hidden message
    DialogApi.getResponse('who are you').then(this.addAgentMessage);
  }
};

</script>

<style scoped>
</style>
