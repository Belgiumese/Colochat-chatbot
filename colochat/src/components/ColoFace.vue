<template>
  <div class="coloFace">
    <img 
      ref="image"
      :src="imgName" 
      alt="Colo mascot">
  </div>
</template>

<script>
import ColoHappy from '../assets/colo_happy.png';
import ColoSleepy from '../assets/colo_sleepy.png';
import ColoStandard from '../assets/colo_standard.png';

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
      //const imgName = faces[emotion];
      if (imgUrl) {
        this.imgName = imgUrl;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coloFace {
  img {
    width: 400px;
    height: 300px;
  }
}
</style>
