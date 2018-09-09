<template>
  <div class="faq">
    <div class="faqContainer">
      <div id="faqTop">
        <colo-face/>
        <div>
          <h1>Help</h1>
          <h2><span class="faqNumber">1</span> ABCD</h2>        
          <h2><span class="faqNumber">2</span> EFG HI</h2>
          <h2><span class="faqNumber">3</span> JK</h2>
        </div>
      </div>
      <div class="faqSection">
        <h3>QUESTION 1</h3>
        <p>To be filled out later. To be filled out later. To be filled out later. To be filled out later. To be filled out later. 
          To be filled out later. To be filled out later. To be filled out later.</p>
      </div>
      <div class="faqSection">
        <h3>QUESTION 2</h3>
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
  name: 'FAQ',
  components: {
    'colo-face': ColoFace
  }
};
</script>

<style lang="scss" scoped>
$myvar: hsl(340, 100%, 79%);

.faq {
  background-color: $myvar;
  display: block;
  position: relative;
  padding: 50px;
  min-height: 100vh;

  .faqContainer {
    background-color: white;
    text-align: center;
    padding: 80px 100px;
    border-radius: 30px;

    #faqTop {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      list-style-position: inside;

      div {
        margin: 10px;
      }
    }

    .faqSection {
      padding: 30px 0;
      text-align: left;
    }
  }
}

</style>

