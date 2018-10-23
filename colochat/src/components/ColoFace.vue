<template>
  <div class="coloFace">
    <!-- <animation 
      :src="iframeLink"/> -->

    <div 
      class="coloImage" 
      :style="{ 'background-image': `url(${imgName})` }"/>
  </div>
</template>

<script>
// import Util from '../services/Util';
// import NewAnimation from './NewAnimation';
import ColoHappy from '../assets/colo_faces/colo_happy.js';
import ColoSleepy from '../assets/colo_faces/colo_sleepy.js';
import ColoStandard from '../assets/colo_faces/colo_standard.js';

// import * as createjs from 'createjs-module';

export default {
  name: 'ColoFace',

  components: {
    // 'animation': NewAnimation
  },
  
  // Contains any variables on the object
  data() {
    return {
      imgName: ColoHappy,
      // ANIM: {
      //   SLEEP: 0,
      //   WAKE: 1
      // },
      // animating: false,
      // iframeLink: ''
    };
  },

  // Methods on the object
  methods: {
    setHappy() {
      this.setEmotion(ColoHappy);
    },

    setSleepy() {
      this.setEmotion(ColoSleepy);
    },

    setStandard() {
      this.setEmotion(ColoStandard);
    },

    setEmotion(imgUrl) {
      if (imgUrl) {
        this.imgName = imgUrl;
      }
    },

    // animateSleep() {
    //   this.iframeLink = './sleeping/sleeping.html';
    //   // this.animating = true;
    // },

    // async animateWakeUp() {
    //   this.iframeLink = './starting/index.html';
    //   this.animating = true;

    //   await Util.delay(50000000);

    //   // this.animating = false;
    // }
  },
};
</script>

<style lang="scss" scoped>
$height: 180px;
$width: 240px;

.coloFace {
  width: $width;
  height: $height;
  box-sizing: content-box;

  .coloImage {
    width: inherit;
    height: inherit;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }
}

@media only screen and (min-width: 1001px) {
  .coloFace {
    width: 360px;
    height: 240px;
  }
}
</style>

