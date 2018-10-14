<template>
  <div class="coloFace">
    <!-- <img 
      ref="image"
      :src="imgName" 
      alt="Colo mascot"> -->
    <!-- <svgicon :name="imgName"/> -->
    <div 
      class="coloImage" 
      :style="{ 'background-image': `url(${imgName})` }"/>
  </div>
</template>

<script>
import ColoHappy from '../assets/colo_faces/colo_happy.js';
import ColoSleepy from '../assets/colo_faces/colo_sleepy.js';
import ColoStandard from '../assets/colo_faces/colo_standard.js';

export default {
  // Contains any variables on the object
  data() {
    return {
      imgName: ColoHappy
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
    }
  }
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

<style>
</style>

