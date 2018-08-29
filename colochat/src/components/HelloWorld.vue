<template>
  <div class="hello">
    <input 
      type="text" 
      v-model="inputText"
      @keyup.enter="submit">
    <button 
      @click="submit" 
    >Submit</button>
    <h2>{{ responseText }}</h2>
  </div>
</template>

<script>
import Api from '../services/Api.js';

export default {
  name: 'HelloWorld',

  data() {
    return {
      inputText: '',
      responseText: ''
    };
  },

  methods: {
    submit() {
      Api.getResponse(this.inputText).then(res => this.responseText = res);
    }
  }
};

</script>

<style scoped>
</style>
