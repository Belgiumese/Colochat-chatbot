import firebase from 'firebase/app';
import SOURCE from './Sources';
import MessageData from './MessageData';

require('firebase/functions');

// Firebase connection settings
const config = {
  apiKey: 'AIzaSyAfzcNH6j3yaV4fWOYoJpe83Re7lRVKeJI',
  authDomain: 'newagent-9dde0.firebaseapp.com',
  databaseURL: 'https://newagent-9dde0.firebaseio.com',
  projectId: 'newagent-9dde0',
  storageBucket: 'newagent-9dde0.appspot.com',
  messagingSenderId: '515593992141'
};
firebase.initializeApp(config);

let dialogSessionId = null;
const RES_TIMEOUT = 30000;

// Initialise dialogflow functions
// make an intent request to dialogflow
const dialogFlowRequest = firebase.functions().httpsCallable('dialogFlowRequest');

function formatMessageData(messageData) {
  console.log(messageData);
  const messageDataSet = [];

  const messages = [];
  let responseOptions;

  // Gotta map this cause the data format is weird
  const unFilteredMessages = messageData.queryResult.fulfillmentMessages;
  unFilteredMessages.forEach(unfilteredMessage => {
    if (unfilteredMessage.message === 'text') {
      // Standard text input, add to messages
      messages.push(unfilteredMessage.text.text[0]);
    } else if (unfilteredMessage.message === 'quickReplies') {
      // These are suggestions
      responseOptions = unfilteredMessage.quickReplies.quickReplies;
    }
  });

  for (let i = 0; i < messages.length; i++) {
    if (messages[i] !== '') {
      messageDataSet.push(MessageData({
        id: messageData.responseId + i,
        action: messageData.queryResult.action,
        text: messages[i],
        source: SOURCE.SOURCE_AGENT,
        options: (i === (messages.length - 1)) ? responseOptions : null,
      }));
    }
  }

  return messageDataSet;
}

function errorResponse(err) {
  console.log(err);

  return [MessageData({
    id: Number.MAX_SAFE_INTEGER,
    text: `Sorry, something went wrong and I got confused.
           Please try asking again!`,
    source: SOURCE.SOURCE_AGENT
  })];
}

export default {
  getResponse(text) {
    // Set a timeout for if the message doesn't arrive
    const timeout = setTimeout(() => errorResponse('Timeout'), RES_TIMEOUT);

    return dialogFlowRequest({ text: text, sessionPath: dialogSessionId })
      .then(res => {
        clearTimeout(timeout);

        if (!dialogSessionId) {
          dialogSessionId = res.data.sessionPath;
        }

        const formattedMessages = formatMessageData(res.data.message);
        if (!formattedMessages.length) {
          return errorResponse('Empty Message');
        }
        return formattedMessages;
      }).catch(err => {
        clearTimeout(timeout);
        return errorResponse(err);
      });
  }
};
