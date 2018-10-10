<template>
  <transition name="appear">
    <div class="meetColo">
      <div class="content">
      
        <div
          class="enterName1"
          v-if="phase == PHASE.ENTER_NAME">
          <p>Hi! I'm Colo, who are you?</p>
        </div>

        <div 
          class="greeting1"
          v-if="phase == PHASE.GREETING">
          <p>It's great to meet you {{ nameText }}! I'm Colo the koala chatbot, here to help you learn a bit about Aboriginal Languages from 
          Queensland. Are you familiar with using ColoChat?</p>
        </div>

        <div 
          class="welcome1"
          v-if="phase == PHASE.WELCOME">
          <p>Welcome to Colochat! Colochat is a fun and interactive way to learn about Aboriginal languages. Here you can chat with me, ask 
          me to translate for you and ask me to quiz you.</p>
        </div>

        <div 
          class="features1"
          v-if="phase == PHASE.FEATURES">
          <p>At the moment, I know the translations for a bunch of different body parts from 18 Aboriginal languages!  Before we start chatting,
          here are some examples of questions you can ask me:</p>
          <ul>
            <li>'How are you today, Colo?'</li>
            <li>'What languages do you know Colo?'</li>
            <li>'Can you translate the worm arm?'</li>
            <li>'Colo, can you quiz me on body parts in Wakka-wakka?'</li>
          </ul>
        </div>

        <div 
          class="end1"
          v-if="phase == PHASE.END">
          <p>Lastly, when you’re chatting to me, don’t worry too much because you can just chat naturally to me. 😊  Okay, now let’s start!!</p>
        </div>

        <colo-face ref="coloFace"/>
        <div class="inputArea">

          <button 
            v-if="phase == PHASE.SLEEPING"
            class="wakeUp accentBtn" 
            @click="wakeUpClick">Wake up, Colo!</button>

          <div 
            class="enterName" 
            v-if="phase == PHASE.ENTER_NAME">

            <input 
              class="nameInput"
              type="text" 
              placeholder="Enter your name..."
              v-model="nameText"
              @keyup.enter="enterName">

            <button 
              class="submit"
              @click="enterName" 
              :disabled="!nameText">Submit</button>
          </div>

          <div 
            v-if="phase == PHASE.GREETING" 
            class="greeting">
            <button 
              class="accentBtn"
              @click="toEnd">Yes</button>
            <button
              class="accentBtn"
              @click="toWelcome">No</button>
          </div>
          
          <div 
            v-if="phase == PHASE.WELCOME" 
            class="welcome">
            <button 
              class="accentBtn"
              @click="toFeatures">Next</button>
          </div>

          <div 
            v-if="phase == PHASE.FEATURES" 
            class="features">
            <button 
              class="accentBtn"
              @click="toEnd">Next</button>
          </div>

          <div 
            v-if="phase == PHASE.END" 
            class="end">
            <button 
              class="accentBtn"
              @click="close">Start!</button>
          </div>

        </div>

        <button 
          class="skipBtn" 
          @click="close">Skip</button>
      </div>
    </div>
  </transition>
</template>

<script>
import ColoFace from './ColoFace.vue';

export default {
  name: 'MeetColo',

  components: {
    'colo-face': ColoFace
  },

  data() {
    return {
      PHASE: {
        SLEEPING: 0,
        WAKING_UP: 1,
        ENTER_NAME: 2,
        GREETING: 3,
        WELCOME: 4,
        FEATURES: 5,
        END: 6
      },
      phase: 0,
      nameText: ''
    };
  },

  methods: {
    wakeUpClick() {
      // TODO: Add colo wakeup animation
      this.phase = this.PHASE.ENTER_NAME;
      this.$refs.coloFace.setStandard();
    },

    enterName() {
      if (this.nameText) {
        localStorage.setItem('name', this.nameText);
        this.phase = this.PHASE.GREETING;
        this.$refs.coloFace.setHappy();
      }
    },

    toWelcome(){
      this.phase = this.PHASE.WELCOME;
      this.$refs.coloFace.setStandard();
    },

    toFeatures(){
      this.phase = this.PHASE.FEATURES;
      this.$refs.coloFace.setHappy();
    },

    toEnd(){
      this.phase = this.PHASE.END;
      this.$refs.coloFace.setStandard();
    },

    close() {
      this.$emit('exit');
    }
  },

  //mounted() {
  // this.$refs.coloFace.setSleepy();
  //}
};
</script>

<style lang="scss" scoped>
$accent: hsl(340, 100%, 79%);

.meetColo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  font-family: "Open Sans", sans-serif;
  font-size: 25px;
  background-image: url("../assets/intro_bg.jpg");
  background-position: center;
  background-size: cover;

  .content {
    width: 90%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .enterName1 {
      position: relative;
      background: white;
      border-radius: 0.4em;
      border: 2px solid #6fa2fe;
      margin: 0 auto;
      padding: 0.4em;
    }

    .greeting1 {
      position: relative;
      background: white;
      border-radius: 0.4em;
      border: 2px solid #6fa2fe;
      margin: 0 auto;
      padding: 0.4em;
    }

    .welcome1 {
      position: relative;
      background: white;
      border-radius: 0.4em;
      border: 2px solid #6fa2fe;
      margin: 0 auto;
      padding: 0.4em;
    }

    .features1 {
      position: relative;
      background: white;
      border-radius: 0.4em;
      border: 2px solid #6fa2fe;
      margin: 0 auto;
      padding: 0.4em;
      font-size: 20px;
      list-style-position: inside;
    }

    .end1 {
      position: relative;
      background: white;
      border-radius: 0.4em;
      border: 2px solid #6fa2fe;
      margin: 0 auto;
      padding: 0.4em;
    }

    .inputArea {
      margin-top: 30px;

      .nameInput {
        margin: 0 10px;
        padding: 10px;
        border: 1px solid grey;
        font-size: 30px;
      }

      button {
        display: inline-block;
        margin: 20px 0;
        color: $accent;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s ease;
        background: white;
        padding: 8px 20px;
        border: 3px solid $accent;

        &:hover {
          background-color: $accent;
          color: white;
          cursor: pointer;
        }
      }

      .accentBtn {
        border: 4px solid $accent;
        border-radius: 12px;
        font-size: 30px;
      }

      .enterName {
        input {
          font-size: 20px;
        }

        .submit {
          font-size: 20px;
          border-radius: 7px;
        }
      }

      .greeting {
        button {
          margin-top: 20px;
          margin-left: 10px;
          margin-right: 10px;
        }
      }

      .welcome {
        button {
          margin-top: 20px;
        }
      }

      .features {
        button {
          margin-top: 20px;
        }
      }

      .end {
        button {
          margin-top: 20px;
        }
      }
    }

    .skipBtn {
      font-size: 20px;
      background: transparent;
      position: absolute;
      right: 50px;
      bottom: 40px;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.15s;
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
}
</style>