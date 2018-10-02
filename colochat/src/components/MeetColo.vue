<template>
  <transition name="appear">
    <div class="meetColo">
      <div class="content">

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
            <p>It's great to meet you {{ nameText }}! I can't wait to start chatting with you!</p>
            <button 
              class="accentBtn"
              @click="close">
              Start!
            </button>
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
        GREETING: 3
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

  .content {
    width: 90%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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
