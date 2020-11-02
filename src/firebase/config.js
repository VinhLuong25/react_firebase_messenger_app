import Firebase from "firebase";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_API_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_DATABASEURL,
  projectId: "react-messenger-app-c30ce",
  storageBucket: "react-messenger-app-c30ce.appspot.com",
  messagingSenderId: "700435432402",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-EE8L4TBQM2",
};
// Initialize Firebase
export const firebase = Firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
