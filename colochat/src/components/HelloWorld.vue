<template>
  <div class="hello">
    <message-box :messages="messages"/>
    <input 
      type="text" 
      v-model="inputText"
      @keyup.enter="submit">
    <button 
      @click="submit" 
    >Submit</button>
  </div>
</template>

<script>
import Api from '../services/Api.js';
import SOURCE from '../services/Sources.js';
import MessageData from '../services/MessageData.js';
import MessageBox from './MessageBox';

export default {
  name: 'HelloWorld',

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

  methods: {
    submit() {
      // Add human message
      this.addHumanMessage(this.inputText);
      // Submit for response, then add it
      Api.getResponse(this.inputText).then(res => this.messages.push(res));
    },

    addHumanMessage(text) {
      const messageData = MessageData({
        source: SOURCE.SOURCE_HUMAN, 
        text: text, 
        id: this.idCounter++
      });
      this.messages.push(messageData);
    }
  }
};

</script>

<style scoped>
</style>
