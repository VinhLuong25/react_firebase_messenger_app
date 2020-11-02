import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3JZhsdlCngeq2AK3wpOzewO0Hy7Gr8tI",
  authDomain: "react-messenger-app-c30ce.firebaseapp.com",
  databaseURL: "https://react-messenger-app-c30ce.firebaseio.com",
  projectId: "react-messenger-app-c30ce",
  storageBucket: "react-messenger-app-c30ce.appspot.com",
  messagingSenderId: "700435432402",
  appId: "1:700435432402:web:3ba6a86653ab08e4a33e0b",
  measurementId: "G-EE8L4TBQM2",
};
// Initialize Firebase
export const firebase = Firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
