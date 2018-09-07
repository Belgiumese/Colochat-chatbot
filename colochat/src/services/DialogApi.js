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

// Initialise dialogflow functions
// make an intent request to dialogflow
const dialogFlowRequest = firebase.functions().httpsCallable('dialogFlowRequest');

function formatMessageData(messageData) {
  // Gotta map this cause the data format is weird
  const messages = messageData.queryResult.fulfillmentMessages.map((data) => data.text.text[0]);
  const messageDataSet = [];

  for (let i = 0; i < messages.length; i++) {
    messageDataSet.push(MessageData({
      id: messageData.responseId + i,
      action: messageData.queryResult.action,
      text: messages[i],
      source: SOURCE.SOURCE_AGENT
    }));
  }
  return messageDataSet;
}

export default {
  getResponse(text) {
    console.time('res');
    return dialogFlowRequest({ text: text, sessionPath: dialogSessionId })
      .then(res => {
        console.timeEnd('res');
        if (!dialogSessionId) {
          dialogSessionId = res.data.sessionPath;
        }
        return formatMessageData(res.data.message);
      });
  }
};
