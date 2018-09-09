<template>
  <div class="furtherInfo">
    <div class="infoContainer">
      <colo-face/>
      <h1>Information</h1>
      <h2>Find out more about reviving Aboriginal languages</h2>
      <div class="infoSection">
        <h3>HEADING 1</h3>
        <p>To be filled out later. To be filled out later. To be filled out later. To be filled out later. To be filled out later. 
        To be filled out later. To be filled out later. To be filled out later.</p>
      </div>
      <div class="infoSection">
        <h3>HEADING 2</h3>
        <p>To be filled out later. To be filled out later. To be filled out later. To be filled out later. To be filled out later. 
        To be filled out later. To be filled out later. To be filled out later.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ColoFace from '../components/ColoFace.vue';

export default {
  name: 'FurtherInfo',
  components: {
    'colo-face': ColoFace
  }
};
</script>

<style lang="scss" scoped>
$myvar: hsl(340, 100%, 79%);

.furtherInfo {
  background-color: $myvar;
  display: block;
  position: relative;
  padding: 50px;
  min-height: 100vh;

  .infoContainer {
    background-color: white;
    text-align: center;
    padding: 80px 100px;
    border-radius: 30px;

    .infoSection {
      padding: 30px 0;
      text-align: left;
    }
  }
}
</style>

