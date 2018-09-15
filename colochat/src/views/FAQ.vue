<template>
  <div class="faq">
    <div class="faqContainer bg">
      <div id="faqTop">
        <colo-face/>
        <div>
          <h1>Help</h1>
          <h2><span class="faqNumber">1</span>Who is Colo?</h2>        
          <h2><span class="faqNumber">2</span>What can Colo do?</h2>
          <h2><span class="faqNumber">3</span>How can I use Colochat?</h2>
          <h2><span class="faqNumber">4</span>Can Colo Respond to All of My Questions?</h2>
          <h2><span class="faqNumber">5</span>Who is Colochat for?</h2>
        </div>
      </div>
      <div class="faqSection">
        <h3>1 Who is Colo?</h3>
        <p>
          Hi, I’m Colo the Koala, your personal artificial intelligence assistant, I am familiar with Australian aboriginal languages and culture. I can also teach you indigenous culture and languages and learn more with you.
        </p>
      </div>
      <div class="faqSection">
        <h3>2 What can Colo do?</h3>
        <p>
          You can chat with me about a range of topics. I can perform translations between English and eight Aboriginal Languages which are Bundjalung, Gumbaynggirr, Muruwari, Paakantyi, Wiradjuri, Yandruwandha, Yuwaalaraay, Gamilaraay, you can ask me questions about basic aboriginal related Australian history, and I can quiz you on words that you’ve learnt throughout your conversation.
        </p>
      </div>
      <div class="faqSection">
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
            I can translate basic words from a number of Aboriginal languages.
            <br><br>An example of how you can ask me to translate is:
          </p>
          <p class="faqCode">
            'Can you translate the word arm from Wakka-wakka'
          </p>
          <p>
            Make sure you mention which language you'd like me to translate from. If you're not sure what languages I know you can just ask me with something like:
          </p>
          <p class="faqCode">
            'What languages do you know Colo?'
          </p>
          <h4>Basic Aboriginal Facts</h4>
          <p>
            I've learnt a little bit about basic Aboriginal history. So feel free to ask me a question and I'll try my best to answer.
            <br><br>An example of a question you can ask me is:
          </p>
          <p class="faqCode">
            'What are the colours on the Aboriginal flag?'
          </p>
          <h4>Quiz Me Colo</h4>
          <p>
            To help you learn I can quiz you on a few different topics based on the words I know.
            <br>The possible quiz topics are 'body parts' and 'greetings'.
            <br><br>An example of how you can ask me to quiz you is:
          </p>
          <p class="faqCode">
            'Colo, can you quiz me on body parts in Wakka-wakka?'
          </p>
        </div>
      </div>
      <div class="faqSection">
        <h3>4 Can Colo Respond to All of My Questions?</h3>
        <p>
          Although I'll try my best to answer your questions and translate for you, I'm still learning. Please be patient with me! If I can't answer your question it might help if you try to rephrase it differently for me.
        </p>
      </div>
      <div class="faqSection">
        <h3>5 Who is Colochat for?</h3>
        <p>
          ColoChat can be used by anyone, however, it is specifically targeted towards students in grades 5 - 9. It is intended to be a tool distributed by teachers within in their classrooms.
        </p>
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
$accent: hsl(340, 100%, 79%);

.faq {
  display: block;
  position: relative;
  padding: 50px 150px;
  min-height: 100vh;

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
    padding: 50px 0;
    border-radius: 30px;

    #faqTop {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      list-style-position: inside;
      padding: 0 50px;

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

        .faqCode {
          padding: 3px 5px;
          border-radius: 4px;
          color: #dc1482;
          background-color: #f1f1f1;
          display: inline-block;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>