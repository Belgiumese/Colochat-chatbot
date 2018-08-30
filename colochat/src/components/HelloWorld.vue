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
import MessageBox from './MessageBox';

export default {
  name: 'HelloWorld',

  components: {
    'message-box': MessageBox
  },

  data() {
    return {
      inputText: '',
      messages: []
    };
  },

  methods: {
    submit() {
      Api.getResponse(this.inputText).then(res => this.messages.push(res));
    }
  }
};

</script>

<style scoped>
</style>
