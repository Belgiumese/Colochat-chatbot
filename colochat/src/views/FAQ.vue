<template>
  <div class="faq">
    <div class="faqContainer">
      <div id="faqTop">
        <colo-face ref="coloFace"/>
        <div>
          <h1>Help</h1>
          <h2><span class="faqNumber">1</span><a href="#faq1">Who is Colo?</a></h2>     
          <h2><span class="faqNumber">2</span><a href="#faq2">What can Colo do?</a></h2>      
          <h2><span class="faqNumber">3</span><a href="#faq3">How can I use Colochat?</a></h2>      
          <h2><span class="faqNumber">4</span><a href="#faq4">Can Colo Respond to All of My Questions?</a></h2>
        </div>
      </div>
      <div 
        class="faqSection" 
        id="faq1">
        <h3>1 Who is Colo?</h3>
        <p>
          Hi, I’m Colo the Koala! 🐨 I like studying Australian Aboriginal languages and culture.  
          When I’m not learning, I'm' just eating 🍃 or sleeping. 
          You can ask me to do a bunch of fun things like translate and quiz you! So come chat with me and I’ll try my best to answer your questions and learn more with you.
        </p>
      </div>
      <div 
        class="faqSection" 
        id="faq2">
        <h3>2 What can Colo do?</h3>
        <p id="faqLanguages">
          You can chat with me about a range of topics and I can perform translations between English and 18 Aboriginal Languages which are:
          <br>
          <span class="faqCode">Barunggam</span>
          <span class="faqCode">Butchulla</span>
          <span class="faqCode">Dharumbal</span>
          <span class="faqCode">Duungidjawu</span>
          <span class="faqCode">Gooreng</span>
          <span class="faqCode">Gunggari</span>
          <span class="faqCode">Kala-kawaw-ya</span>
          <span class="faqCode">Kuku-yalanji</span>
          <span class="faqCode">Nggerikudi</span>
          <span class="faqCode">Nggerrikwidhi</span>
          <span class="faqCode">Turubal</span>
          <span class="faqCode">Wakka-wakka</span>
          <span class="faqCode">Warrgamay</span>
          <span class="faqCode">Yugambeh</span>
          <span class="faqCode">Yugarabul</span>
          <span class="faqCode">Yuggera</span>
          <span class="faqCode">Yuwaalaraay</span>
          <span class="faqCode">Yuwibara</span>
          <br>
          <br>
          At the moment, the only words I know are body parts. Here are just a few of words I know:
          <br>
          <span class="faqCode">Arm</span>
          <span class="faqCode">Belly</span>
          <span class="faqCode">Chin</span>
          <span class="faqCode">Ear</span>
          <span class="faqCode">Elbow</span>
          <span class="faqCode">Eyes</span>
          <span class="faqCode">Face</span>
          <span class="faqCode">Heart</span>
          <span class="faqCode">Mouth</span>
          <span class="faqCode">Teeth</span>
          <span class="faqCode">Thumb</span>
          <span class="faqCode">Tongue</span>
          <span class="faqCode">Wrist</span>
          <br>
          <br>
          You can also ask me questions about basic aboriginal related Australian history, and I can quiz you on words that you’ve learnt throughout our conversation.
        </p>
      </div>
      <div 
        class="faqSection" 
        id="faq3">
        <h3>3 How can I use Colochat?</h3>
        <p>
          These are some common topics you can talk to me about:
        </p>
        <div id="faqExamples">
          <h4>Casual Conversation</h4>
          <p>
            Feel free to ask me questions like:
          </p>
          <p class="faqCode">
            'Hey Colo, how are you today?'
          </p>
          <h4>Translations</h4>
          <p>
            I can translate body parts from a number of Aboriginal languages.
            <br><br>An example of how you can ask me to translate is:
          </p>
          <p class="faqCode">
            'Can you translate the word arm?'
          </p>
          <p>
            If you're not sure what languages I know you can just ask me with something like:
          </p>
          <p class="faqCode">
            'What languages do you know Colo?'
          </p>
          <p>
            I don't always know the translation in all 18 languages, so if I can't translate a word for you maybe try choosing a different language.
          </p>
          <h4>Quiz Me Colo</h4>
          <p>
            To help you learn I can quiz you on the Aboriginal languages I know.
            <br>The words will be on body parts.
            <br><br>An example of how you can ask me to quiz you is:
          </p>
          <p class="faqCode">
            'Colo, can you quiz me on body parts in Wakka-wakka?'
          </p>
          <h4>Tell me a joke</h4>
          <p>
            I can tell you super funny jokes! Well I think they are at least.🤣
            <br><br>You can ask for a joke with something like:
          </p>
          <p class="faqCode">
            'Tell me a joke, Colo'
          </p>
        </div>
      </div>
      <div 
        class="faqSection" 
        id="faq4">
        <h3>4 Can Colo Respond to All of My Questions?</h3>
        <p>
          Although I'll try my best to answer your questions and translate for you, I'm still learning. Please be patient with me! If I can't answer your question it might help if you try to rephrase it differently for me.
        </p>
      </div>
    </div>   
  </div>
</template>

<script>
import ColoFace from '../components/ColoFace.vue';

export default {
  name: 'FAQ',
  components: {
    'colo-face': ColoFace
  },

  mounted() {
    this.$refs.coloFace.setStandard();
  }
};
</script>

<style lang="scss" scoped>
$accent: hsl(340, 100%, 79%);

.faq {
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

  .faqContainer {
    background-color: white;
    text-align: center;
    padding: 5vh 0;
    border-radius: 30px;

    @media only screen and (max-width: 1000px) {
      #faqTop {
        flex-direction: column;

        h1 {
          text-align: center;
        }
      }
    }

    #faqTop {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      list-style-position: inside;
      padding: 0 50px;

      a {
        text-decoration: none;
        color: black;
      }

      a:hover {
        text-decoration: underline;
      }

      div {
        margin: 10px;
        font-size: 0.8em;

        h1 {
          font-size: 5em;
        }

        span {
          background: $accent;
          color: white;
          border-radius: 1em;
          padding: 0 0.5em;
          margin-right: 5px;
        }

        h2 {
          margin: 10px 0;
        }
      }
    }

    .faqSection {
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

      #faqExamples {
        margin-left: 30px;
      }

      .faqCode {
        padding: 3px 5px;
        border-radius: 4px;
        color: #dc1482;
        background-color: #f1f1f1;
        display: inline-block;
        margin: 10px 0;
      }

      #faqLanguages {
        .faqCode {
          margin: 5px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .faq {
    padding: 5%;
    background: white;

    .faqContainer {
      padding-top: 0 !important;
    }

    #faqTop {
      padding: 0 !important;
    }

    .faqSection {
      padding: 10px 0 5px 0 !important;

      #faqExamples {
        margin: 0 !important;
      }
    }
  }
}
</style>