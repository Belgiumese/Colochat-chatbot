'use strict';

const functions = require('firebase-functions');
const dialogflow = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
const axios = require('axios');

const agentSettings = {
  projectId: 'newagent-9dde0',
  sessionId: 'test-session',
  languageCode: 'en-AU'
};

const slqLanguageSources = {
  Barunggam: 'ec6accc5-07d9-44d3-bf6d-0b363a73f3ef',
  Butchulla: '35350512-a668-4bde-a58c-46092a07d1de',
  Dharumbal: 'b86e4743-d65b-4f68-935a-1c57480cde3e',
  Duungidjawu: '81f76d7f-4ada-40c3-976c-6a24b459b1e0',
  Gooreng: 'a0ca1aee-e886-4ea1-978a-f0c80d4558be',
  Gunggari: '2d2ef02c-1c89-4011-91ba-a4d6e95551df',
  'Kala-kawaw-ya': '92fde7ae-f2e8-484e-81db-f717cc5d2707',
  'Kuku-yalanji': 'ab7ab13e-a66c-4a50-b5d2-034e4a0683bc',
  Nggerikudi: '91dbac9b-d853-424e-8ce0-29a8bc74399b',
  Nggerrikwidhi: 'c06c3742-d9df-4eb4-9264-21bba62a1a2a',
  Turubal: 'da3ac749-840a-479d-9466-09eb8d6e389d',
  'Wakka-wakka': 'dfa3b2cc-0788-456a-b132-2db687b6257a',
  Warrgamay: 'c340e92d-ed7f-478e-ab7e-d79137441327',
  Yugambeh: '4ea75e17-cb1e-473e-9b6b-c0227b1fa787',
  Yugarabul: '34b5f663-6c32-4ad9-8f8e-7f63ce5156f2',
  Yuggera: 'ea4031e6-dc7a-4584-ac38-482f570a9637',
  Yuwaalaraay: 'ad345bd7-8544-4ff4-9b0e-8225b4050f6f',
  Yuwibara: '1a7f0c01-d27f-4865-be23-c2276655a529'
}

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(agentSettings.projectId, agentSettings.sessionId);

process.env.DEBUG = 'dialogflow:debug';

// Given a language and a word to translate, get the translation and return it
function getTranslation(language, word) {

  const languageId = slqLanguageSources[language];
  console.log(`Language: ${language}, ID: ${languageId}, Word: ${word}`);
  if (!languageId) {
    // If this language isn't in the list, reject
    return Promise.reject(`Sorry, I'm still learning and don't know that language yet :(`);
  }

  const query = encodeURI(`SELECT * FROM "${languageId}" WHERE LOWER("English") LIKE LOWER('${word}')`);
  const url = `https://data.gov.au/api/3/action/datastore_search_sql?sql=${query}`;
  console.log(url);

  return axios.get(url)
    .then(res => {
      console.log(`TRANSLATE RESULTS: ${JSON.stringify(res.data)}`);
      // TODO: Do something to pick one if there's more than one result
      const results = res.data.result.records;

      if (results.length === 0) {
        // No response
        return Promise.reject('Sorry, I don\'t know the translation for that word yet!');
      } else {
        // For now, just pick the first. Implement fuzzy search later
        return results[0][language];
      }
    }, err => {
      console.log(err);
      return Promise.reject('Something went wrong and I got confused, please try asking again!');
    });
}

// Remove any trailing whitespace and common punctuation.
function formatText(inputString) {
  return inputString.trim().replace(/[?.!]/g, '');
}

// Capitalise the first letter of the string, required for languages
function capitaliseText(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

// This webhook is called by dialogflow on a fulfillment request. Adds the correct response
// And returns.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  // Fix for dialogflow smalltalk, which does not have an intent property and crashes the
  // dialogflow-fulfillment handleRequest function. Pretend to be an intent called 'none'.
  if (!request.body.queryResult.intent) {
    request.body.queryResult.intent = { displayName: 'none', isFallback: true};
  }

  const fulfillmentText = request.body.queryResult.fulfillmentText;
  console.log(`RESULT: ${JSON.stringify(request.body.queryResult)}`);

  const agent = new WebhookClient({ request, response });
  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase inline editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://dialogflow.com/images/api_home_laptop.svg',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://docs.dialogflow.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});

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
      // On failure, respond with the translation issue.
      agent.add(err);
      return agent;
    })
  });

  agent.handleRequest(intentMap);
});

// This function is triggered by the front-end to make a dialogflow request.
// It simply makes a request, then returns the result.
exports.dialogFlowRequest = functions.https.onCall((data, context) => {
  // Make a request to dialogflow based on the text given to the request
  return sessionClient.detectIntent({
    session: sessionPath,
    queryInput: {
      text: {
        text: data.text,
        languageCode: agentSettings.languageCode,
      },
    },
    // Send back the actual data, cutting out useless information
  }).then(agentResponse => {
    return agentResponse[0];
  });
});