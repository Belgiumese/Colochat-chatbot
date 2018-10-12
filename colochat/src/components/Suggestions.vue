<template>
  <div class="suggestions">
    <h3>Not sure what to say? Try:</h3>
    <div 
      class="suggestOptions"
      ref="suggestionList">

      <transition-group 
        name="new" 
        @beforeLeave="beforeLeave">
        <button 
          v-for="(suggestion, i) in suggestions"
          @click="suggestionClick" 
          :key="`${suggestion},${i}`">{{ suggestion }}</button>
      </transition-group>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Suggestions',

  data() {
    return {
      suggestions: [],

      suggestionOptions: [
        'What is the word for arm in Turubal?',
        'Tell me a joke!',
        'Can you give me a quiz in wakka-wakka?',
        'How are you?',
        'Who are you?',
        'Can you tell me more about you?',
        'How do I say leg?',
        'Are we friends?',
        'Give me a quiz!',
        'What can you do?',
        'What words can you translate?',
        'What is Colochat about?',
        'What other information do you have on aboriginal language or culture?',
        'How many aboriginal languages were there?',
        'How many languages do you know?',
        'What aboriginal languages do you know?',
        'Can you translate something for me?',
        'What aboriginal languages can you translate?'
      ],

      current: 0
    };
  },

  methods: {
    suggestionClick(event) {
      // Emit the message they chose
      const elem = event.srcElement;
      const msg = elem.innerText;
      this.$emit('clicked', msg);

      // Replace with another message
      const i = this.suggestions.indexOf(msg);
      if (i !== -1) {
        this.$set(this.suggestions, i, this.getNewMessage());
      }
    },

    getNewMessage() {
      this.current++;
      if (this.current >= this.suggestionOptions.length) {
        this.current = 0;
      }
      return this.suggestionOptions[this.current];
    },

    beforeLeave(el) {
      const rect = el.getBoundingClientRect();
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
    }
  },

  beforeMount() {
    for (let i = 0; i < 3; i++) {
      this.suggestions.push(this.suggestionOptions[i]);
    }
    this.current = 2;
  }
};
</script>


<style lang="scss" scoped>
.suggestions {
  width: 360px;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 18px;
  margin-top: 10px;

  h3 {
    margin-bottom: 10px;
  }

  .suggestOptions {
    overflow: hidden;
    position: relative;

    button {
      background-color: white;
      padding: 7px 10px;
      margin: 5px auto;
      border: 1px solid grey;
      border-radius: 15px;
      font-size: 16px;
      outline: none;
      transition: background-color 0.15s ease;
      display: block;

      &:hover {
        cursor: pointer;
        background-color: rgb(232, 233, 238);
      }
    }

    .new-enter-active,
    .new-leave-active {
      transition: opacity 0.5s ease-in-out;
    }

    .new-leave-active {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -4px);
    }

    .new-enter {
      opacity: 0;
    }

    .new-leave-to {
      opacity: 0;
    }
  }
}
</style>
