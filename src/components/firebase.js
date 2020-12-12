import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFWwVDQgKtHXeLnsWLK3iBpAttZpDBD64",
    authDomain: "jobyup-41b9f.firebaseapp.com",
    databaseURL: "https://jobyup-41b9f.firebaseio.com/",
    projectId: "jobyup-41b9f",
    storageBucket: "jobyup-41b9f.appspot.com",
    messagingSenderId: "856708566688",
    appId: "1:856708566688:web:bd45b0b3fc3bef2dcb03c5",
    measurementId: "G-6E1DPCENYT"
  };

const fire = firebase.initializeApp(firebaseConfig);
//const database = fire.firestore();

export default fire;