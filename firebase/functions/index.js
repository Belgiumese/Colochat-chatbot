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

// This handles all the dialogflow response stuff
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  // function welcome(agent) {
  //   agent.add(`Welcome to my agent!`);
  //   return axios.get('https://yesno.wtf/api/')
  //     .then(res => {
  //       agent.add(res.data.answer);
  //       return agent;
  //     })
  //     .catch(err => {
  //       agent.add(`Err: ${err}`);
  //       return agent;
  //     });
  // }

  // function fallback(agent) {
  //   agent.add(`I didn't understand`);
  //   agent.add(`I'm sorry, can you try again?`);
  // }

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
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }

  // let intentMap = new Map();
  // intentMap.set('Default Welcome Intent', welcome);
  // intentMap.set('Default Fallback Intent', fallback);

  // agent.handleRequest(intentMap);
});

// This is user request stuff
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
  }).then(agentResponse => agentResponse[0]);
});