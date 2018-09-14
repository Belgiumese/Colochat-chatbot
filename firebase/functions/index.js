'use strict';

const functions = require('firebase-functions');
const dialogflow = require('dialogflow');
const { WebhookClient, Payload, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');

const slqRequest = axios.create({
  timeout: 4000
});

const ID_SIZE = 10;
const QUIZ_QUESTIONS = 5;

const agentSettings = {
  projectId: 'newagent-9dde0',
  sessionId: 'test-session',
  languageCode: 'en-AU'
};

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

const sessionClient = new dialogflow.SessionsClient();
//const sessionPath = sessionClient.sessionPath(agentSettings.projectId, agentSettings.sessionId);

process.env.DEBUG = 'dialogflow:debug';

// Given a language and a word to translate, get the translation and return it
// function getTranslation(language, word) {

//   const languageId = slqLanguageSources[language];
//   if (!languageId) {
//     // If this language isn't in the list, reject
//     return Promise.reject(`Sorry, I'm still learning and don't know that language yet :(`);
//   }

//   const query = encodeURI(`SELECT * FROM "${languageId}" WHERE LOWER("English") LIKE LOWER('${word}')`);
//   const url = `https://data.gov.au/api/3/action/datastore_search_sql?sql=${query}`;

//   return axios.get(url)
//     .then(res => {
//       // TODO: Do something to pick one if there's more than one result
//       const results = res.data.result.records;

//       if (results.length === 0) {
//         // No response
//         return Promise.reject('Sorry, I don\'t know the translation for that word yet!');
//       } else {
//         // For now, just pick the first. Implement fuzzy search later
//         return results[0][language];
//       }
//     }, err => {
//       console.log(`COLO ERR: ${err}`);
//       return Promise.reject('Something went wrong and I got confused, please try asking again!');
//     });
// }

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
        // For each entry, get 3 fake ones
        for (let j = 0; j < 3; j++) {
          const randomWord = allWords[getRandom(i + 1, allWords.length - 1)];
          allWords[i].fakeOptions.push(randomWord.english);
        }
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
    //agent.add('Let me check that for you...');
    const language = capitaliseText(formatText(agent.parameters.aboriginal_language));
    const word = formatText(agent.parameters.Word);

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
  });

  // This is triggered when someone starts a quiz. Get random words to translate and
  // add them as a parameter on the context.
  intentMap.set('quiz_start', agent => {
    const language = capitaliseText(formatText(agent.parameters.language));
    console.log(`Quiz language ${language}`);

    return getQuizzes(language, QUIZ_QUESTIONS).then(quizzes => {
      console.log(`Quizzes: ${JSON.stringify(quizzes)}`);
      // Update the lifespan and the 5 words
      const context = agent.getContext('quiz_context');
      context.lifespan = 10;
      context.parameters.answers = quizzes;
      agent.setContext(context);

      // Prompt for a question
      // agent.add(new Payload("PLATFORM_UNSPECIFIED", {
      //   message: `What does ${quizzes[0].aboriginal} mean?`,
      //   responseOptions: ['Leg', 'Arm', 'Blood']
      // }));
      //agent.add(`What does ${quizzes[0].aboriginal} mean?`);
      const options = quizzes[0].fakeOptions.slice(0);
      options.push(quizzes[0].english);
      console.log(`OPTIONS: ${JSON.stringify(options)}`);
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
      agent.add('correct answer!');
      context.parameters.score++;
    } else {
      agent.add(`Sorry, the correct answer is ${correctAnswer}`);
    }

    progress++;
    const currentQuiz = quizzes[progress];

    if (progress === QUIZ_QUESTIONS) {
      agent.add(`You have scored ${context.parameters.score} out of 
        ${QUIZ_QUESTIONS} on the quiz!`);
      agent.clearContext('quiz_context');
    } else {
      context.parameters.current_progress = progress;
      agent.setContext(context);

      // Ask next question
      const options = currentQuiz.fakeOptions.concat(currentQuiz.english);
      askQuizQuestion(agent, currentQuiz.aboriginal, options, progress, QUIZ_QUESTIONS);
    }

    return agent;
  });

  agent.handleRequest(intentMap);
});

function askQuizQuestion(agent, aboriginalWord, options, progress, totalAmount) {
  // agent.add(new Payload("PLATFORM_UNSPECIFIED", {
  //   message: `What does ${aboriginalWord} mean?`,
  //   responseOptions: options
  // }));
  agent.add(`(${progress + 1}/${totalAmount}) What does ${aboriginalWord} mean?`);
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
    //res.message = agentResponse[0];
    return { message: agentResponse[0], sessionPath: data.sessionPath };
  });
});