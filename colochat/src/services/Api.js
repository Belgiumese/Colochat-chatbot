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

// Initialise dialogflow functions
// make an intent request to dialogflow
const dialogFlowRequest = firebase.functions().httpsCallable('dialogFlowRequest');

function formatMessageData(messageData) {
  return MessageData({
    id: messageData.responseId,
    action: messageData.queryResult.action,
    text: messageData.queryResult.fulfillmentText,
    source: SOURCE.SOURCE_AGENT
  });
}

export default {
  getResponse(text) {
    return dialogFlowRequest({ text: text })
      .then(res => {
        console.log(res.data);
        return formatMessageData(res.data);
      });
  }
};
