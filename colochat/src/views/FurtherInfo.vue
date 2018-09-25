<template>
  <div class="furtherInfo">
    <div class="infoContainer">
      <div id="infoTop">
        <colo-face class="colo-info margin-auto"/>
        <h1>Info</h1>
        <h2>Find out more about Aboriginal language revival!</h2>
      </div>
      <div class="infoSection">
        <h3>The Creation of Colochat</h3>
        <p>
          Colochat is an interactive web-app that is designed to bring awareness and understanding to Aboriginal languages and culture in a new medium. Colochat is created to be fun and interactive and to provide a more memorable alternative to in-class lessons for school children from grades 5-9. In the absence of the availability of an Aboriginal language teacher, Colo is readily available to provide translations, quizzes and facts on Aboriginal language.
        </p>
        <br>
        <p>
          The purpose of Colochat is to spark an interest in students and motivate them to further explore the topic. Additionally, the issue that we are trying to address here is the endangerment of Aboriginal languages as it is important that we preserve the country’s native language. 
        </p>
      </div>
      <div class="infoSection">
        <h3>Further Initiatives</h3>
        <p>
          If you would like to learn more about  initiatives to revive Aboriginal language, head on to the following links:
        </p>
        <h4>My Grandmother’s Lingo</h4>
        <p>
          An innovative online documentary combines voice-activated gaming technology with unique animations to unlock chapters to the story of one woman’s fight to save her endangered Indigenous language. Discover about her story below.
        </p>
        <a 
          class="info-btn" 
          target="_blank"
          href="https://www.sbs.com.au/mygrandmotherslingo/">
          Go to Site
        </a>
        <h4>Gidarjil Development Corporation</h4>
        <p>
          The Central Queensland Language Centre supports local indigenous language communities with the revitalisation and maintenance of their language, through a range of language programs such as resource development, language learning, language worker training, workshop delivery and community learning. To learn more about their current initiatives, click on their link below.
        </p>
        <a 
          class="info-btn" 
          target="_blank"
          href="http://www.gidarjil.com.au/what-we-do/language">
          Go to Site
        </a>
        <h4>North Queensland Regional Aboriginal Corporation Languages Centre (NQRACLC)</h4>
        <p>
          NQRACLC helps facilitate workshops, lessons, publications, and revival of Aboriginal languages in the region they cover. To find out more about the languages that is covered by NQRACLC, head over to their website.
        </p>
        <a 
          class="info-btn" 
          target="_blank"
          href="http://www.nqraclc.com.au/">
          Go to Site
        </a>
        <h4>Nalingu Aboriginal Corporation</h4>
        <p>
          Nalingu Aboriginal Corporation is responsible for the research, recording and preservation of the languages around the Maranoa and Ballone Rivers in Central Queensland. Through the assistance of Nalingu Corporation, a Gunngari Language Program is being run for the students in Mitchell State School. To find out more about the program, look no further and click on the link below.
        </p>
        <a 
          class="info-btn" 
          target="_blank"
          href="http://ourlanguages.org.au/namex/nalingu-aboriginal-corporation-2/">
          Go to Site
        </a>
        <h4>Yugambeh Museum Language and Heritage Research Centre</h4>
        <p>
          Yugambeh Museum, Language and Heritage Research Centre helps in recording and promoting the traditional knowledge of their region, especially the Yugambeh language which was spoken throughout South East Queensland. To learn more about their community, head over to their website now.
        </p>
        <a 
          class="info-btn" 
          target="_blank"
          href="https://www.yugambeh.com/">
          Go to Site
        </a>
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

      .info-btn {
        display: inline-block;
        border: 2px solid $accent;
        padding: 7px 15px;
        border-radius: 4px;
        margin: 20px 0;
        color: $accent;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.5s ease;

        &:hover {
          background-color: $accent;
          color: white;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

