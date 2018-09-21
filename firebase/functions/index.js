'use strict';

const functions = require('firebase-functions');
const dialogflow = require('dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');

const slqRequest = axios.create({
  timeout: 4000
});

const ID_SIZE = 10;
const QUIZ_QUESTIONS = 3;

const agentSettings = {
  projectId: 'newagent-9dde0',
  sessionId: 'test-session',
  languageCode: 'en-AU'
};

const sessionClient = new dialogflow.SessionsClient();

process.env.DEBUG = 'dialogflow:debug';

const slqLanguageSources = {
  Barunggam: { id: 'ec6accc5-07d9-44d3-bf6d-0b363a73f3ef', column: 'Barunggam' },
  Butchulla: { id: '35350512-a668-4bde-a58c-46092a07d1de', column: 'Butchulla' },
  Dharumbal: { id: 'b86e4743-d65b-4f68-935a-1c57480cde3e', column: 'Dharumbal' },
  Duungidjawu: { id: '81f76d7f-4ada-40c3-976c-6a24b459b1e0', column: 'Duungidjawu' },
  Gooreng: { id: 'a0ca1aee-e886-4ea1-978a-f0c80d4558be', column: 'Gooreng Gooreng' },
  Gunggari: { id: '2d2ef02c-1c89-4011-91ba-a4d6e95551df', column: 'Gunggari' },
  'Kala-kawaw-ya': { id: '92fde7ae-f2e8-484e-81db-f717cc5d2707', column: 'Kala Kawaw Ya' },
  'Kuku-yalanji': { id: 'ab7ab13e-a66c-4a50-b5d2-034e4a0683bc', column: 'KuKu Yalanji' },
  Nggerikudi: { id: '91dbac9b-d853-424e-8ce0-29a8bc74399b', column: 'Nggerikudi' },
  Nggerrikwidhi: { id: 'c06c3742-d9df-4eb4-9264-21bba62a1a2a', column: 'Nggerikudi' },
  Turubal: { id: 'da3ac749-840a-479d-9466-09eb8d6e389d', column: 'Turubul' },
  'Wakka-wakka': { id: 'dfa3b2cc-0788-456a-b132-2db687b6257a', column: 'Wakka Wakka' },
  Warrgamay: { id: 'c340e92d-ed7f-478e-ab7e-d79137441327', column: 'Warrgamay' },
  Yugambeh: { id: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787', column: 'Yugambeh' },
  Yugarabul: { id: '34b5f663-6c32-4ad9-8f8e-7f63ce5156f2', column: 'Yugarabul' },
  Yuggera: { id: 'ea4031e6-dc7a-4584-ac38-482f570a9637', column: 'Yuggera' },
  Yuwaalaraay: { id: 'ad345bd7-8544-4ff4-9b0e-8225b4050f6f', column: 'Yuwaalaraay' },
  Yuwibara: { id: '1a7f0c01-d27f-4865-be23-c2276655a529', column: 'Yuwibara' },
}

const MSG_OPTIONS = {
  QUIZ_CORRECT: [
    "That's correct, well done!",
    "You're right! Good job!",
    "That's the right answer, good job!",
    "Nice work! That was right!"
  ],
  QUIZ_INCORRECT: [
    "Sorry, the answer is actually ${this.answer}",
    "Almost there! The correct answer was ${this.answer}",
    "Unfortunately that's not correct, the answer was ${this.answer}",
  ],
  QUIZ_QUESTION: [
    "What does ${this.aboriginalWord} mean?",
    "What is the translation of ${this.aboriginalWord}?",
  ]
};

function evalTemplate(str, templateVars) {
  return new Function(`return \`${str}\`;`).call(templateVars);
}

function getArrayRandEntry(arr) {
  const randomIndex = getRandom(0, arr.length - 1);
  return arr[randomIndex];
}

function getRandomResponse(msgOption, templateVars) {
  const chosenOption = getArrayRandEntry(MSG_OPTIONS[msgOption]);
  return evalTemplate(chosenOption, templateVars);
}

function getTranslation(language, word) {
  return getSlqData(language,
    (languageId) => {
      // Query for some randomly selected fields
      return encodeURI(`SELECT * FROM "${languageId}" WHERE LOWER("English") LIKE LOWER('${word}')`);
    }, (res) => {
      const results = res.data.result.records;

      if (results.length === 0) {
        // No response
        return Promise.reject(
          `I'm still learning, and I don't know the translation for that word yet! 
          Try asking me to translate a body part.`);
      } else {
        const aboColumnName = slqLanguageSources[language].column;
        // For now, just pick the first. Implement fuzzy search later
        return results[0][aboColumnName];
      }
    });
}

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getQuizzes(language, amount) {
  // Get more than required to give some incorrect options
  const allOptionsAmount = amount * 3;

  return getSlqData(language,
    (languageId) => {
      // Query for some randomly selected fields
      return encodeURI(`SELECT * FROM "${languageId}" ORDER BY RANDOM() LIMIT ${allOptionsAmount}`);
    }, (res) => {
      // On success, map results to array and return
      const results = res.data.result.records;
      const aboColumnName = slqLanguageSources[language].column;

      const allWords = results.map((word) => {
        return {
          english: word.English,
          aboriginal: word[aboColumnName],
          fakeOptions: []
        };
      });

      // We only want {amount}, the rest are for random options
      for (let i = 0; i < amount; i++) {
        const wordSubset = allWords.slice(i + 1, allWords.length);

        // For each entry, get 3 fake ones
        for (let j = 0; j < 3; j++) {
          // Get a random word from the list of options
          const randomIndex = getRandom(0, wordSubset.length - 1);
          const randomWord = wordSubset[randomIndex];
          wordSubset.splice(randomIndex, 1);

          allWords[i].fakeOptions.push(randomWord.english);
        }

        // Add the real one in at a random spot
        const randomIndex = getRandom(0, allWords[i].fakeOptions.length - 1);
        allWords[i].fakeOptions.splice(randomIndex, 0, allWords[i].english);
      }

      return allWords.slice(0, amount);
    });
}

function getSlqData(language, getQuery, processData) {
  const languageInfo = slqLanguageSources[language];
  if (!languageInfo) {
    // If this language isn't in the list, reject
    return Promise.reject(`Sorry, I'm still learning and don't know that language yet :(`);
  }

  const languageId = languageInfo.id;
  const query = getQuery(languageId);
  const url = `https://data.gov.au/api/3/action/datastore_search_sql?sql=${query}`;
  console.log(`trying to go to ${url}`);

  return slqRequest.get(url)
    .then(processData, err => {
      console.log(`COLO ERR: ${err} in axios`);
      return Promise.reject('Something went wrong and I got confused, please try asking again!');
    });
}

// Remove any trailing whitespace and common punctuation.
function formatText(inputString) {
  //const trimRegex = RegExp(`^[\s\W]*(.*?)[\s\W]$`);

  return inputString.trim().replace(/[?.!,'"]/g, '');
}

// Capitalise the first letter of the string, required for languages
function capitaliseText(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

function uniqueId() {
  return Math.random().toString(36).substr(2, ID_SIZE);
}

// This webhook is called by dialogflow on a fulfillment request. Adds the correct response
// And returns.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  // Fix for dialogflow smalltalk, which does not have an intent property and crashes the
  // dialogflow-fulfillment handleRequest function. Pretend to be an intent called 'none'.
  if (!request.body.queryResult.intent) {
    request.body.queryResult.intent = { displayName: 'none', isFallback: true };
  }

  const fulfillmentText = request.body.queryResult.fulfillmentText;
  console.log(`RESULT: ${JSON.stringify(request.body.queryResult)}`);

  const agent = new WebhookClient({ request, response });
  let intentMap = new Map();

  // If triggering the 'none' intent set before, just respond with the fulfillment text.
  intentMap.set('none', agent => {
    agent.add(fulfillmentText);
  });

  // This is triggered when someone asks for a translation. Get the response from SQL, and
  // Return it.
  intentMap.set('translation', agent => {
    let language = agent.parameters.aboriginal_language;
    let word = agent.parameters.Word;

    if (!word) {
      // Prompt for a word
      agent.add('What word would you like me to translate?');
      return agent;

    } else if (!language) {
      // Prompt for a language, add all languages as options
      agent.add('Which language would you like to translate to?');
      addAllLanguageOptions(agent);
      return agent;

    } else {
      language = capitaliseText(formatText(language));
      word = formatText(word);

      return getTranslation(language, word).then((translation) => {
        // If succeeds, send the translation back to the user.
        agent.add(`The word for ${word} in ${language} is ${translation}!`);
        return agent;

      }).catch((err) => {
        console.log(err);
        // On failure, respond with the translation issue.
        agent.add(err);
        return agent;
      });
    }
  });

  // This is triggered when someone starts a quiz. Get random words to translate and
  // add them as a parameter on the context.
  intentMap.set('quiz_start', agent => {
    let language = agent.parameters.language;

    if (!language) {
      // Prompt for a language
      agent.add('Which language would you like to be quizzed in?');
      addAllLanguageOptions(agent);
      return agent;
    }

    language = capitaliseText(formatText(language));

    return getQuizzes(language, QUIZ_QUESTIONS).then(quizzes => {
      agent.add(`Okay! I'll ask you ${QUIZ_QUESTIONS} questions to test your knowledge.
        You can quit at any time, just ask me to stop the quiz. Here we go!`);
      // Update the lifespan and the 5 words
      const context = agent.getContext('quiz_context');
      context.lifespan = 1;
      context.parameters.answers = quizzes;
      agent.setContext(context);

      const options = quizzes[0].fakeOptions;
      askQuizQuestion(agent, quizzes[0].aboriginal, options, 0, QUIZ_QUESTIONS);

      return agent;
    }).catch((err) => {
      // On failure, respond with the issue.
      console.log(`Adding ${err} to agent`);
      agent.add(err);
      return agent;
    })
  });

  intentMap.set('quiz_answer', agent => {
    // On answer, check if it's correct based on context parameters 
    const userAnswer = formatText(agent.parameters.answer);

    const context = agent.getContext('quiz_context');
    const quizzes = context.parameters.answers
    let progress = context.parameters.current_progress;
    const correctAnswer = quizzes[progress].english;

    console.log(`User answer: '${userAnswer}', correct: '${correctAnswer}'`)

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      agent.add(getRandomResponse('QUIZ_CORRECT'));
      context.parameters.score++;
    } else {
      agent.add(getRandomResponse('QUIZ_INCORRECT', { answer: correctAnswer }));
    }

    progress++;
    const currentQuiz = quizzes[progress];

    if (progress === QUIZ_QUESTIONS) {
      let scoreMsg;
      const score = context.parameters.score;

      if (score < 2) {
        scoreMsg = `You got ${score} out of ${QUIZ_QUESTIONS} correct. Keep practicing,
          you're on the right track!`;
      } else {
        scoreMsg = `You got ${context.parameters.score} out of 
        ${QUIZ_QUESTIONS} on the quiz! That's amazing, well done!`;
      }

      agent.add(scoreMsg);
      agent.clearOutgoingContexts();
    } else {
      context.parameters.current_progress = progress;
      context.lifespan = 1;
      agent.setContext(context);

      // Ask next question
      const options = currentQuiz.fakeOptions; //.concat(currentQuiz.english);
      askQuizQuestion(agent, currentQuiz.aboriginal, options, progress, QUIZ_QUESTIONS);
    }

    return agent;
  });

  agent.handleRequest(intentMap);
});

function askQuizQuestion(agent, aboriginalWord, options, progress, totalAmount) {
  const questionString = getRandomResponse('QUIZ_QUESTION', { aboriginalWord: aboriginalWord });
  agent.add(`Question ${progress + 1} out of ${totalAmount}: ${questionString}`);
  addAllOptions(agent, options);
}

function addAllLanguageOptions(agent) {
  addAllOptions(agent, Object.keys(slqLanguageSources));
}

function addAllOptions(agent, options) {
  options.forEach(option => agent.add(new Suggestion(option)));
}

// This function is triggered by the front-end to make a dialogflow request.
// It simply makes a request, then returns the result.
exports.dialogFlowRequest = functions.https.onCall((data, context) => {

  if (!data.sessionPath) {
    data.sessionPath = sessionClient.sessionPath(agentSettings.projectId, uniqueId());
  }
  console.log(`SESSION PATH: ${data.sessionPath}`);
  // Make a request to dialogflow based on the text given to the request
  return sessionClient.detectIntent({
    session: data.sessionPath,
    queryInput: {
      text: {
        text: data.text,
        languageCode: agentSettings.languageCode,
      },
    },
    // Send back the actual data, cutting out useless information
  }).then(agentResponse => {
    console.log(`AGENT RESPONSE: ${JSON.stringify(agentResponse)}`);

    // Cut out non-necessary information
    const response = agentResponse[0];
    const filteredResponse = {
      responseId: response.responseId,
      queryResult: {
        fulfillmentMessages: response.queryResult.fulfillmentMessages,
        fulfillmentText: response.queryResult.fulfillmentText,
        webhookPayload: response.queryResult.webhookPayload
      }
    }

    return { message: filteredResponse, sessionPath: data.sessionPath };
  });
});