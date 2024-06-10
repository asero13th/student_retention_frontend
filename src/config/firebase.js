// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYEiEZIW2qYucxEZfRZNYsjCDzThefASg",
  authDomain: "student-retention-prediction.firebaseapp.com",
  projectId: "student-retention-prediction",
  storageBucket: "student-retention-prediction.appspot.com",
  messagingSenderId: "583924367583",
  appId: "1:583924367583:web:586fa1726fcd19e86b296a",
  measurementId: "G-HB06C4EQN3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
