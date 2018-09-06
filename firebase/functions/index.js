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

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(agentSettings.projectId, agentSettings.sessionId);

process.env.DEBUG = 'dialogflow:debug';

// Given a language and a word to translate, get the translation and return it
function getTranslation(language, word) {
  //TODO: make a request to SQL services for a response.
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject(`Sorry, I haven't learned how to do this yet. Check back soon, I might know how to
      to translate ${word} into ${language}!`);
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
    agent.add('Let me check that for you...');
    const language = agent.parameters.aboriginal_language;
    const word = agent.parameters.Word;

    return getTranslation(language, word).then((translation) => {
      agent.add(`The word for ${word} in ${language} is ${translation}!`);
      return agent;
    }).catch((err) => {
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