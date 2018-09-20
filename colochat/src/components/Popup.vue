<template>
  <transition name="appear">
    <div class="background">
      <div class="popup">
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup'
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.popup {
  background: #282828;
  padding: 25px 35px;
  text-align: left;
}

.appear-enter-active,
.appear-leave-active {
  transition: opacity 0.1s;
}

.appear-enter,
.appear-leave-to {
  opacity: 0;
}
</style>
