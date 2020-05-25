import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDa_ER2uSp_-CqNiflnIcILUsiqHjlGnHU",
  authDomain: "mynewproject-fb8ae.firebaseapp.com",
  databaseURL: "https://mynewproject-fb8ae.firebaseio.com",
  projectId: "mynewproject-fb8ae",
  storageBucket: "mynewproject-fb8ae.appspot.com",
  messagingSenderId: "1074248171783",
  appId: "1:1074248171783:web:9d4d80eda685cc5d73c5a2",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const storage = firebase.storage();
