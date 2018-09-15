<template>
  <div class="furtherInfo">
    <div class="infoContainer">
      <div id="infoTop">
        <colo-face class="colo-info margin-auto"/>
        <h1>Info</h1>
        <h2>Find out more about Aboriginal language revival!</h2>
      </div>
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
$accent: hsl(340, 100%, 79%);

.furtherInfo {
  display: block;
  position: relative;
  padding: 7vh 10vw;
  min-height: 100vh;
  background: $accent;

  p {
    font-size: 1.1em;
  }

  h1,
  h3,
  h4 {
    font-family: "Averia Serif Libre", sans-serif;
  }

  h1 {
    font-size: 5em;
  }

  .colo-info {
    margin: 10px auto;
  }

  .infoContainer {
    background-color: white;
    text-align: center;
    padding: 5vh 0;
    border-radius: 30px;

    #infoTop {
      font-size: 0.8em;
    }

    .infoSection {
      padding: 30px 50px 10px 50px;
      text-align: left;
      max-width: 900px;
      margin: auto;

      h3 {
        color: $accent;
        font-size: 1.5em;
        margin-bottom: 10px;
      }

      h4 {
        font-size: 1.3em;
        margin: 30px 0 10px 0;
      }
    }
  }
}
</style>

