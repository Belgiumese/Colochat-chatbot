<template>
  <div class="home">
    <!-- For now, this page only contains the chatbot component -->
    <ChatBot/>
  </div>
</template>

<script>
// @ is an alias to /src
import ChatBot from '@/components/ChatBot.vue';

export default {
  name: 'Home',
  components: {
    ChatBot
  }
};
</script>
