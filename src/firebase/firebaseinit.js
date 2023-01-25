// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzf4Dg3SeCnTAolcEOFfmV8CS5YIO-Nws",
  authDomain: "ticket-app-5e812.firebaseapp.com",
  projectId: "ticket-app-5e812",
  storageBucket: "ticket-app-5e812.appspot.com",
  messagingSenderId: "973630178960",
  appId: "1:973630178960:web:21d49d5ebe44b00e747a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();