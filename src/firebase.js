import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD92XA-83F0CHqpSKJhihtW2zEmEHhO1MQ",
  authDomain: "auth-simple-d5f0e.firebaseapp.com",
  projectId: "auth-simple-d5f0e",
  storageBucket: "auth-simple-d5f0e.appspot.com",
  messagingSenderId: "86815170772",
  appId: "1:86815170772:web:5006bf899857048b59db41",
  measurementId: "G-SEQ46278V9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
