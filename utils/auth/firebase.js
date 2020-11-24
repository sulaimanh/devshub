import "firebase/firestore";
import "firebase/auth";

import firebase from "firebase/app";

// let firebaseApp = null;

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  });
}

const db = firebase.firestore();
const auth = firebase.auth();
const FieldValue = firebase.firestore.FieldValue;
const TimeStamp = firebase.firestore.TimeStamp;

// const ServerValue = firebase.database.ServerValue;

export { db, auth, FieldValue, TimeStamp, firebase };
