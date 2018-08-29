import firebase from 'firebase/app';
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

export default {
  getResponse(text) {
    return dialogFlowRequest({ text: text })
      .then(res => res.data.queryResult.fulfillmentText);
  }
};
