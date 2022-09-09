import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD65N5zcHWalOiruztrBI4zGpYlfHSN6Qg",
  authDomain: "binarchallenge10.firebaseapp.com",
  projectId: "binarchallenge10",
  storageBucket: "binarchallenge10.appspot.com",
  messagingSenderId: "643594178493",
  appId: "1:643594178493:web:5c9c517c78e6cbbb8a8cd4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
