import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

var firebaseConfig = {
  apiKey: "AIzaSyDa_ER2uSp_-CqNiflnIcILUsiqHjlGnHU",
  authDomain: "mynewproject-fb8ae.firebaseapp.com",
  databaseURL: "https://mynewproject-fb8ae.firebaseio.com",
  projectId: "mynewproject-fb8ae",
  storageBucket: "mynewproject-fb8ae.appspot.com",
  messagingSenderId: "1074248171783",
  appId: "1:1074248171783:web:d1d67aa50228898173c5a2",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const storage = firebase.storage();
