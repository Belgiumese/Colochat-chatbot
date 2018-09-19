<template>
  <div class="meetColo">
    <div class="content">

      <colo-face/>
      <div class="inputArea">

        <button 
          v-if="phase == PHASE.SLEEPING"
          class="wakeUp" 
          @click="wakeUpClick">Wake up, Colo!</button>

        <div 
          class="enterName" 
          v-if="phase == PHASE.ENTER_NAME">

          <input 
            type="text" 
            placeholder="Enter your name..."
            v-model="nameText"
            @keyup.enter="enterName">

          <button 
            @click="enterName" 
            :disabled="!nameText">Submit</button>
        </div>

        <div 
          v-if="phase == PHASE.GREETING" 
          class="greeting">
          <p>It's great to meet you {{ nameText }}! Come on in!</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import Popup from './Popup.vue';
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
    },

    enterName() {
      if (this.nameText) {
        localStorage.setItem('name', this.nameText);
        this.phase = this.PHASE.GREETING;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .content {
    width: 90%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .inputArea {
      margin-top: 30px;

      .wakeUp {
        background: #f7a7d3;
        padding: 10px;
        border: 2px solid #dc1482;
        font-weight: 600;
        font-size: 30px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
