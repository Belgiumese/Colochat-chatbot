<template>
  <transition name="appear">
    <div class="meetColo">
      <div class="content">
      
        <div 
          class="speechBubble" 
          v-if="showSpeechBubble">

          <p v-if="phase == PHASE.ENTER_NAME">Hi! I'm Colo 🐨, what's your name?</p>

          <p v-else-if="phase == PHASE.GREETING">It's great to meet you {{ nameText }}! 
          I'm Colo the koala, here to help you learn a bit about Aboriginal Languages 
          from Queensland. Have you used Colochat before?</p>

          <p v-else-if="phase == PHASE.WELCOME">Welcome to Colochat! Colochat is a fun and 
          interactive way to learn about Aboriginal languages. Here you can chat with me,
          ask me to translate for you and ask me to quiz you.</p>

          <div 
            class="features" 
            v-else-if="phase == PHASE.FEATURES">
            <p>At the moment, I know the translations for a bunch of different body parts 
            from 18 Aboriginal languages! Here are some examples of questions you can ask 
            me:</p>
            <ul>
              <li>'How are you today, Colo?'</li>
              <li>'What languages do you know?'</li>
              <li>'Can you translate the word arm?'</li>
              <li class="hideOnMobile">'Colo, can you quiz me on body parts in Wakka-wakka?'</li>
            </ul>
          </div>

          <p v-else-if="phase == PHASE.END_TUTORIAL">Lastly, when you’re chatting to me, don’t 
          worry too much because you can just speak naturally to me. 😊 Okay, let's 
          get started!</p>

          <p v-else-if="phase == PHASE.END">That's great! 😊 Let's 
          get started!</p>

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
              @click="toEndTutorial">Next</button>
          </div>

          <div 
            v-if="phase == PHASE.END || phase == PHASE.END_TUTORIAL" 
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
        END: 6,
        END_TUTORIAL: 7
      },
      phase: 0,
      nameText: '',
    };
  },

  computed: {
    // Returns true if the current phase uses a speech bubble
    showSpeechBubble() {
      return (this.phase !== this.PHASE.SLEEPING 
        && this.phase !== this.PHASE.WAKING_UP);
    }
  },

  methods: {
    async wakeUpClick() {
      // TODO: Add colo wakeup animation
      await this.$refs.coloFace.animateWakeUp();
      this.phase = this.PHASE.ENTER_NAME;
      // this.$refs.coloFace.setStandard();
    },

    enterName() {
      if (this.nameText) {
        localStorage.setItem('name', this.nameText);
        this.phase = this.PHASE.GREETING;
        this.$refs.coloFace.setHappy();
      }
    },

    toWelcome() {
      this.phase = this.PHASE.WELCOME;
      this.$refs.coloFace.setStandard();
    },

    toFeatures() {
      this.phase = this.PHASE.FEATURES;
      this.$refs.coloFace.setHappy();
    },

    toEnd() {
      this.phase = this.PHASE.END;
      this.$refs.coloFace.setStandard();
    },

    toEndTutorial() {
      this.phase = this.PHASE.END_TUTORIAL;
      this.$refs.coloFace.setStandard();
    },

    close() {
      this.$emit('exit');
    }
  },

  mounted() {
    this.$refs.coloFace.setSleepy();
  }
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

  @media only screen and (max-width: 1000px) {
    .hideOnMobile {
      display: none !important;
    }
  }

  .content {
    width: 90%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .speechBubble {
      $arrowWidth: 20px;
      $arrowHeight: 20px;
      $borderColor: #6fa2fe;
      $fillColor: white;

      position: relative;
      background: $fillColor;
      border-radius: 0.4em;
      border: 2px solid $borderColor;
      margin: 0 auto 15px auto;
      padding: 0.4em;

      .features {
        font-size: 20px;

        ul {
          list-style-type: none;

          li {
            padding: 3px 5px;
            border-radius: 4px;
            color: #dc1482;
            background-color: #f1f1f1;
            display: inline-block;
            margin: 5px 0;
          }
        }
      }

      &::after {
        content: "";
        position: absolute;
        right: -$arrowWidth;
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        border-left: $arrowWidth solid transparent;
        border-right: $arrowWidth solid transparent;
        border-top: $arrowHeight solid $borderColor;
        transform: translateX(-50%);
        z-index: 2;
      }

      &::before {
        content: "";
        position: absolute;
        right: -$arrowWidth;
        top: 100%;
        left: 50%;
        width: 0;
        height: 0;
        border-left: $arrowWidth solid transparent;
        border-right: $arrowWidth solid transparent;
        border-top: $arrowHeight solid $fillColor;
        transform: translate(-50%, -20%);
        z-index: 3;
      }
    }

    .inputArea {
      margin-top: 10px;

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